import { Router } from 'express'
import { query } from '../db.js'

const router = Router()

// 公司荣誉(按 sort)
router.get('/honors', async (req, res, next) => {
  try {
    const rows = await query('SELECT name_zh, name_en, desc_zh, desc_en, image FROM honors ORDER BY sort')
    res.json({
      honors: rows.map((r) => ({
        name: { zh: r.name_zh, en: r.name_en },
        desc: { zh: r.desc_zh, en: r.desc_en },
        image: r.image,
      })),
    })
  } catch (err) { next(err) }
})

// 合作伙伴(按 sort)
router.get('/partners', async (req, res, next) => {
  try {
    const rows = await query('SELECT slug, name_zh, name_en, image FROM partners ORDER BY sort')
    res.json({
      partners: rows.map((r) => ({
        id: r.slug,
        name: { zh: r.name_zh, en: r.name_en },
        image: r.image,
      })),
    })
  } catch (err) { next(err) }
})

export default router
