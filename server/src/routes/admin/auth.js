import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { query } from '../../db.js'
import { signToken } from '../../middleware/auth.js'

const router = Router()

// 登录:用户名+密码 → JWT
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body || {}
    if (!username || !password) return res.status(400).json({ error: 'username and password required' })
    const rows = await query('SELECT * FROM admins WHERE username = ?', [username])
    const admin = rows[0]
    if (!admin || !admin.is_active || !bcrypt.compareSync(password, admin.password_hash)) {
      return res.status(401).json({ error: 'invalid credentials' })
    }
    res.json({ token: signToken(admin), nickname: admin.nickname, username: admin.username })
  } catch (err) { next(err) }
})

// 当前登录者信息(前端用它校验 token 有效性)
router.get('/me', async (req, res, next) => {
  try {
    const rows = await query('SELECT id, username, nickname FROM admins WHERE id = ?', [req.admin.id])
    res.json(rows[0])
  } catch (err) { next(err) }
})

// 密码策略:≥8 位且同时含字母与数字
export function validPassword(p) {
  return typeof p === 'string' && p.length >= 8 && /[A-Za-z]/.test(p) && /\d/.test(p)
}

// 修改当前账号密码
router.put('/password', async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body || {}
    if (!oldPassword || !validPassword(newPassword)) {
      return res.status(400).json({ error: 'old password required; new password >= 8 chars with letters and digits' })
    }
    const rows = await query('SELECT password_hash FROM admins WHERE id = ?', [req.admin.id])
    if (!bcrypt.compareSync(oldPassword, rows[0].password_hash)) {
      return res.status(400).json({ error: 'old password incorrect' })
    }
    await query('UPDATE admins SET password_hash = ? WHERE id = ?', [bcrypt.hashSync(newPassword, 10), req.admin.id])
    res.json({ ok: true })
  } catch (err) { next(err) }
})

export default router
