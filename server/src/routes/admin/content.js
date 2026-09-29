// 内容管理 CRUD:新闻/职位/荣誉/伙伴 + 分类/产品/参数
// 全部挂载于 /api/admin,由 requireAdmin 保护;行数据保持 _zh/_en 平铺字段
import { Router } from 'express'
import { query } from '../../db.js'

const router = Router()

function crud(name, table, order, allowEdit, select) {
  const cols = async () => (await query(`SHOW COLUMNS FROM \`${table}\``)).map((c) => c.Field)
  // news/jobs 主键沿用静态数据的编号(非自增),新增时未指定 id 则自动分配 MAX(id)+1
  const isAutoId = async () => {
    const c = (await query(`SHOW COLUMNS FROM \`${table}\``)).find((x) => x.Key === 'PRI')
    return /auto_increment/i.test(c?.Extra || '')
  }
  const pick = async (body) => {
    const all = await cols()
    const data = {}
    for (const k of allowEdit) if (body?.[k] !== undefined && all.includes(k)) data[k] = body[k]
    return data
  }
  const selectSql = select || `SELECT * FROM \`${table}\``
  router.get(`/${name}`, async (req, res, next) => {
    try { res.json({ [name]: await query(`${selectSql} ORDER BY ${order}`) }) } catch (e) { next(e) }
  })
  router.post(`/${name}`, async (req, res, next) => {
    try {
      const data = await pick(req.body)
      if (!(await isAutoId()) && data.id === undefined) {
        const [{ mid }] = await query(`SELECT COALESCE(MAX(id),0) AS mid FROM \`${table}\``)
        data.id = mid + 1
      }
      const keys = Object.keys(data)
      if (!keys.length) return res.status(400).json({ error: 'no valid fields' })
      const r = await query(`INSERT INTO \`${table}\` (${keys.map((k) => `\`${k}\``).join(',')}) VALUES (${keys.map(() => '?').join(',')})`, keys.map((k) => data[k]))
      res.json({ id: data.id ?? r.insertId })
    } catch (e) { next(e) }
  })
  router.put(`/${name}/:id`, async (req, res, next) => {
    try {
      const data = await pick(req.body)
      const keys = Object.keys(data)
      if (!keys.length) return res.status(400).json({ error: 'no valid fields' })
      await query(`UPDATE \`${table}\` SET ${keys.map((k) => `\`${k}\`=?`).join(',')} WHERE id=?`, [...keys.map((k) => data[k]), req.params.id])
      res.json({ ok: true })
    } catch (e) { next(e) }
  })
  router.delete(`/${name}/:id`, async (req, res, next) => {
    try {
      await query(`DELETE FROM \`${table}\` WHERE id=?`, [req.params.id])
      res.json({ ok: true })
    } catch (e) { next(e) }
  })
}

crud('news', 'news', 'news_date DESC', ['tag_zh','tag_en','news_date','title_zh','title_en','summary_zh','summary_en','content_zh','content_en','is_published'], `SELECT id, tag_zh, tag_en, DATE_FORMAT(news_date,'%Y-%m-%d') AS news_date, title_zh, title_en, summary_zh, summary_en, content_zh, content_en, is_published FROM news`)
crud('jobs', 'jobs', 'id', ['title_zh','title_en','dept_zh','dept_en','location_zh','location_en','desc_zh','desc_en','is_active'])
crud('honors', 'honors', 'sort', ['name_zh','name_en','desc_zh','desc_en','image','sort'])
crud('partners', 'partners', 'sort', ['slug','name_zh','name_en','image','sort'])
crud('product-categories', 'product_categories', 'sort', ['slug','name_zh','name_en','desc_zh','desc_en','sort'])

// 产品:gallery 以 JSON 存储
const productFields = ['category_id','model','tag_zh','tag_en','image','gallery','desc_zh','desc_en','sort']
router.get('/products', async (req, res, next) => {
  try {
    const rows = await query('SELECT * FROM products ORDER BY category_id, sort')
    for (const r of rows) if (r.gallery && typeof r.gallery === 'object') r.gallery = JSON.stringify(r.gallery)
    res.json({ products: rows })
  } catch (e) { next(e) }
})
router.post('/products', async (req, res, next) => {
  try {
    const data = {}
    for (const k of productFields) if (req.body?.[k] !== undefined) data[k] = k === 'gallery' ? JSON.stringify(req.body[k] || null) : req.body[k]
    const keys = Object.keys(data)
    if (!keys.length) return res.status(400).json({ error: 'no valid fields' })
    const r = await query(`INSERT INTO products (${keys.map((k) => `\`${k}\``).join(',')}) VALUES (${keys.map(() => '?').join(',')})`, keys.map((k) => data[k]))
    res.json({ id: r.insertId })
  } catch (e) { next(e) }
})
router.put('/products/:id', async (req, res, next) => {
  try {
    const data = {}
    for (const k of productFields) if (req.body?.[k] !== undefined) data[k] = k === 'gallery' ? JSON.stringify(req.body[k] || null) : req.body[k]
    const keys = Object.keys(data)
    if (!keys.length) return res.status(400).json({ error: 'no valid fields' })
    await query(`UPDATE products SET ${keys.map((k) => `\`${k}\`=?`).join(',')} WHERE id=?`, [...keys.map((k) => data[k]), req.params.id])
    res.json({ ok: true })
  } catch (e) { next(e) }
})
router.delete('/products/:id', async (req, res, next) => {
  try {
    await query('DELETE FROM product_params WHERE product_id=?', [req.params.id])
    await query('DELETE FROM products WHERE id=?', [req.params.id])
    res.json({ ok: true })
  } catch (e) { next(e) }
})

// 参数行:按产品整组替换保存
router.get('/products/:id/params', async (req, res, next) => {
  try { res.json({ params: await query('SELECT * FROM product_params WHERE product_id=? ORDER BY sort', [req.params.id]) }) } catch (e) { next(e) }
})
router.put('/products/:id/params', async (req, res, next) => {
  try {
    const rows = Array.isArray(req.body?.params) ? req.body.params : []
    await query('DELETE FROM product_params WHERE product_id=?', [req.params.id])
    for (let i = 0; i < rows.length; i++) {
      const r = rows[i]
      if (!r.label_zh && !r.label_en) continue
      await query('INSERT INTO product_params (product_id,label_zh,label_en,value_zh,value_en,sort) VALUES (?,?,?,?,?,?)',
        [req.params.id, r.label_zh || '', r.label_en || '', r.value_zh || '', r.value_en || '', i + 1])
    }
    res.json({ ok: true })
  } catch (e) { next(e) }
})

export default router
