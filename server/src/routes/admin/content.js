// 内容管理 CRUD:新闻/职位/荣誉/伙伴 + 分类/产品/参数
// 全部挂载于 /api/admin,由 requireAdmin 保护;行数据保持 _zh 平铺字段(库中仅存中文)
import { Router } from 'express'
import sanitizeHtml from 'sanitize-html'
import { query } from '../../db.js'

const router = Router()

// 输入值校验:类型不符/超长直接拒绝(400);富文本先消毒防存储型 XSS
const NUMERIC_KEYS = new Set(['sort', 'category_id', 'is_published', 'is_active'])
const RICH_KEYS = new Set(['content_zh'])
const STR_MAX = 5000
const RICH_MAX = 200 * 1024

function sanitizeValue(key, value) {
  if (value === null) return null
  if (NUMERIC_KEYS.has(key)) {
    const n = Number(value)
    if (!Number.isFinite(n)) throw Object.assign(new Error(`invalid number: ${key}`), { status: 400 })
    return n
  }
  if (RICH_KEYS.has(key)) {
    if (typeof value !== 'string') throw Object.assign(new Error(`invalid string: ${key}`), { status: 400 })
    if (value.length > RICH_MAX) throw Object.assign(new Error(`value too long: ${key}`), { status: 400 })
    return sanitizeHtml(value, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'span', 'u', 's', 'sub', 'sup', 'h1', 'h2']),
      allowedAttributes: { '*': ['style', 'class'], img: ['src', 'alt', 'width', 'height'], a: ['href', 'target', 'rel'] },
      allowedSchemes: ['http', 'https', 'data'],
    })
  }
  if (typeof value !== 'string') throw Object.assign(new Error(`invalid string: ${key}`), { status: 400 })
  if (value.length > STR_MAX) throw Object.assign(new Error(`value too long: ${key}`), { status: 400 })
  return value
}

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
    for (const k of allowEdit) if (body?.[k] !== undefined && all.includes(k)) data[k] = sanitizeValue(k, body[k])
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

crud('news', 'news', 'news_date DESC', ['tag_zh','news_date','title_zh','summary_zh','content_zh','is_published'], `SELECT id, tag_zh, DATE_FORMAT(news_date,'%Y-%m-%d') AS news_date, title_zh, summary_zh, content_zh, is_published FROM news`)
crud('jobs', 'jobs', 'id', ['title_zh','dept_zh','location_zh','desc_zh','is_active'])
crud('honors', 'honors', 'sort', ['name_zh','desc_zh','image','sort'])
crud('partners', 'partners', 'sort', ['slug','name_zh','image','sort'])
crud('product-categories', 'product_categories', 'sort', ['slug','name_zh','desc_zh','sort'])

// 产品:gallery 以 JSON 存储
const productFields = ['category_id','model','tag_zh','image','gallery','desc_zh','sort']
const pickProduct = (body) => {
  const data = {}
  for (const k of productFields) {
    if (body?.[k] === undefined) continue
    data[k] = k === 'gallery' ? JSON.stringify(body[k] || null) : sanitizeValue(k, body[k])
  }
  return data
}
router.get('/products', async (req, res, next) => {
  try {
    const rows = await query('SELECT * FROM products ORDER BY category_id, sort')
    for (const r of rows) if (r.gallery && typeof r.gallery === 'object') r.gallery = JSON.stringify(r.gallery)
    res.json({ products: rows })
  } catch (e) { next(e) }
})
router.post('/products', async (req, res, next) => {
  try {
    const data = pickProduct(req.body)
    const keys = Object.keys(data)
    if (!keys.length) return res.status(400).json({ error: 'no valid fields' })
    const r = await query(`INSERT INTO products (${keys.map((k) => `\`${k}\``).join(',')}) VALUES (${keys.map(() => '?').join(',')})`, keys.map((k) => data[k]))
    res.json({ id: r.insertId })
  } catch (e) { next(e) }
})
router.put('/products/:id', async (req, res, next) => {
  try {
    const data = pickProduct(req.body)
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
      if (!r.label_zh) continue
      await query('INSERT INTO product_params (product_id,label_zh,value_zh,sort) VALUES (?,?,?,?)',
        [req.params.id, sanitizeValue('label_zh', String(r.label_zh)), sanitizeValue('value_zh', String(r.value_zh || '')), i + 1])
    }
    res.json({ ok: true })
  } catch (e) { next(e) }
})

export default router
