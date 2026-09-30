// 安全中间件集合:CORS 白名单 + helmet 安全头 + 分层限速
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

const isProd = process.env.NODE_ENV === 'production'

// CORS 白名单:FRONTEND_ORIGIN 逗号分隔;开发模式默认放行 localhost
const allowedOrigins = (process.env.FRONTEND_ORIGIN || '')
  .split(',').map((s) => s.trim()).filter(Boolean)
if (!isProd) {
  allowedOrigins.push('http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:4173')
}
export const corsWhitelist = cors({
  origin(origin, cb) {
    // 同源/工具类请求(curl、健康检查)无 Origin,放行
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true)
    cb(new Error('origin not allowed'))
  },
})

// 生产环境缺 JWT_SECRET 时由本模块抛错,拒绝启动(在 index.js import 时触发)
if (isProd && !process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET must be set in production (server/.env)')
}

export const helmetHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'blob:'],
      styleSrc: ["'self'", "'unsafe-inline'"], // wangEditor/EP 内联样式
      scriptSrc: ["'self'"],
    },
  },
})

const jsonMsg = (msg) => (req, res) => res.status(429).json({ error: msg })

// 登录:每 IP 15 分钟 5 次,防爆破
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: jsonMsg('too many attempts, try later'),
})

// 上传:每 IP 15 分钟 30 次
export const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: jsonMsg('too many uploads, try later'),
})

// 全局 API:每 IP 每分钟 120 次
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 120,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: jsonMsg('too many requests'),
})
