import { Router } from 'express'
import { query } from '../db.js'

const router = Router()

// 产品数据:分类 → 产品(含图片文件名与画廊) → 参数,嵌套返回
router.get('/products', async (req, res, next) => {
  try {
    const categories = await query('SELECT * FROM product_categories ORDER BY sort')
    const products = await query('SELECT * FROM products ORDER BY category_id, sort')
    const params = await query('SELECT * FROM product_params ORDER BY product_id, sort')
    // mysql2 会把 JSON 列解析为对象,保险起见兼容字符串形态
    const parseGallery = (g) => (typeof g === 'string' ? JSON.parse(g) : g)

    const paramsByProduct = new Map()
    for (const p of params) {
      if (!paramsByProduct.has(p.product_id)) paramsByProduct.set(p.product_id, [])
      paramsByProduct.get(p.product_id).push({
        label: { zh: p.label_zh },
        value: { zh: p.value_zh },
      })
    }

    // 前端按 model 取参数表,故 products 响应同时带 model 键参数
    const productsByCategory = new Map()
    for (const prod of products) {
      const item = {
        model: prod.model,
        tag: { zh: prod.tag_zh },
        image: prod.image,
        gallery: parseGallery(prod.gallery),
        desc: { zh: prod.desc_zh },
        params: paramsByProduct.get(prod.id) || [],
      }
      if (!productsByCategory.has(prod.category_id)) productsByCategory.set(prod.category_id, [])
      productsByCategory.get(prod.category_id).push(item)
    }

    res.json({
      categories: categories.map((c) => ({
        id: c.slug,
        name: { zh: c.name_zh },
        desc: { zh: c.desc_zh },
        products: productsByCategory.get(c.id) || [],
      })),
    })
  } catch (err) { next(err) }
})

export default router
