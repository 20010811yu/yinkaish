import jwt from 'jsonwebtoken'
import { query } from '../db.js'

const SECRET = process.env.JWT_SECRET || 'yinkai-dev-secret'

export function signToken(admin) {
  return jwt.sign({ sub: admin.id, username: admin.username }, SECRET, { expiresIn: '12h' })
}

// 管理接口鉴权:校验 JWT 且账号仍启用
export async function requireAdmin(req, res, next) {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null
    if (!token) return res.status(401).json({ error: 'unauthorized' })
    let payload
    try {
      payload = jwt.verify(token, SECRET)
    } catch {
      return res.status(401).json({ error: 'token expired or invalid' })
    }
    const rows = await query('SELECT id, username, nickname, is_active FROM admins WHERE id = ?', [payload.sub])
    const admin = rows[0]
    if (!admin || !admin.is_active) return res.status(401).json({ error: 'account disabled' })
    req.admin = admin
    next()
  } catch (err) { next(err) }
}
