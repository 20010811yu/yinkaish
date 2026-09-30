import { Router } from 'express'
import { query } from '../db.js'

const router = Router()

// 新闻列表(已发布,日期倒序)
router.get('/news', async (req, res, next) => {
  try {
    const rows = await query(
      `SELECT id, tag_zh, DATE_FORMAT(news_date, '%Y-%m-%d') AS date,
              title_zh, summary_zh, content_zh
         FROM news WHERE is_published = 1 ORDER BY news_date DESC`
    )
    res.json({
      news: rows.map((r) => ({
        id: r.id,
        tag: { zh: r.tag_zh },
        date: r.date,
        title: { zh: r.title_zh },
        summary: { zh: r.summary_zh },
        content: { zh: r.content_zh },
      })),
    })
  } catch (err) { next(err) }
})

export default router
