import { Router } from 'express'
import { query } from '../db.js'

const router = Router()

// 在招职位(启用中,id 序)
router.get('/jobs', async (req, res, next) => {
  try {
    const rows = await query(
      `SELECT id, title_zh, dept_zh, location_zh, desc_zh
         FROM jobs WHERE is_active = 1 ORDER BY id`
    )
    res.json({
      jobs: rows.map((r) => ({
        id: r.id,
        title: { zh: r.title_zh },
        dept: { zh: r.dept_zh },
        location: { zh: r.location_zh },
        desc: { zh: r.desc_zh },
      })),
    })
  } catch (err) { next(err) }
})

export default router
