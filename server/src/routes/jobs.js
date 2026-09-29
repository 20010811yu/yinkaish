import { Router } from 'express'
import { query } from '../db.js'

const router = Router()

// 在招职位(启用中,id 序)
router.get('/jobs', async (req, res, next) => {
  try {
    const rows = await query(
      `SELECT id, title_zh, title_en, dept_zh, dept_en, location_zh, location_en, desc_zh, desc_en
         FROM jobs WHERE is_active = 1 ORDER BY id`
    )
    res.json({
      jobs: rows.map((r) => ({
        id: r.id,
        title: { zh: r.title_zh, en: r.title_en },
        dept: { zh: r.dept_zh, en: r.dept_en },
        location: { zh: r.location_zh, en: r.location_en },
        desc: { zh: r.desc_zh, en: r.desc_en },
      })),
    })
  } catch (err) { next(err) }
})

export default router
