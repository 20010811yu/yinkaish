import { Router } from 'express'
import { query } from '../db.js'

const router = Router()

// 新闻列表(已发布,日期倒序)
router.get('/news', async (req, res, next) => {
  try {
    const rows = await query(
      `SELECT id, tag_zh, tag_en, DATE_FORMAT(news_date, '%Y-%m-%d') AS date,
              title_zh, title_en, summary_zh, summary_en, content_zh, content_en
         FROM news WHERE is_published = 1 ORDER BY news_date DESC`
    )
    res.json({
      news: rows.map((r) => ({
        id: r.id,
        tag: { zh: r.tag_zh, en: r.tag_en },
        date: r.date,
        title: { zh: r.title_zh, en: r.title_en },
        summary: { zh: r.summary_zh, en: r.summary_en },
        content: { zh: r.content_zh, en: r.content_en },
      })),
    })
  } catch (err) { next(err) }
})

export default router
