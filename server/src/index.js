import express from 'express'
import cors from 'cors'
import newsRoutes from './routes/news.js'
import jobsRoutes from './routes/jobs.js'
import productsRoutes from './routes/products.js'
import contentRoutes from './routes/content.js'
import adminAuthRoutes from './routes/admin/auth.js'
import adminContentRoutes from './routes/admin/content.js'
import { requireAdmin } from './middleware/auth.js'

const app = express()
app.use(cors())
app.use(express.json({ limit: '2mb' }))

app.get('/api/health', (req, res) => res.json({ ok: true }))
app.use('/api', newsRoutes)
app.use('/api', jobsRoutes)
app.use('/api', productsRoutes)
app.use('/api', contentRoutes)
// 管理端:登录接口公开,其余全部需 JWT
app.use('/api/admin', adminAuthRoutes)
app.use('/api/admin', requireAdmin, adminContentRoutes)

// 统一错误处理
app.use((err, req, res, next) => {
  console.error('[api error]', err.message)
  res.status(500).json({ error: 'internal error' })
})

const port = Number(process.env.PORT || 3001)
app.listen(port, () => console.log(`yinkai api listening on http://localhost:${port}`))
