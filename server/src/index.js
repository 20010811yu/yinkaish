import express from 'express'
import cors from 'cors'
import newsRoutes from './routes/news.js'
import jobsRoutes from './routes/jobs.js'
import productsRoutes from './routes/products.js'
import contentRoutes from './routes/content.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => res.json({ ok: true }))
app.use('/api', newsRoutes)
app.use('/api', jobsRoutes)
app.use('/api', productsRoutes)
app.use('/api', contentRoutes)

// 统一错误处理
app.use((err, req, res, next) => {
  console.error('[api error]', err.message)
  res.status(500).json({ error: 'internal error' })
})

const port = Number(process.env.PORT || 3001)
app.listen(port, () => console.log(`yinkai api listening on http://localhost:${port}`))
