// 官网表单后端:联系表单(/api/contact,JSON)与职位申请(/api/apply,multipart 含简历附件),经 SMTP 发邮件通知。
// SMTP 未配置(SMTP_HOST / MAIL_TO 为空)时返回 503;纯静态托管(Netlify)下请求到不了这里,前端仍走 Netlify Forms。
import { Router } from 'express'
import multer from 'multer'
import nodemailer from 'nodemailer'
import { formLimiter } from '../middleware/security.js'

const MAX_RESUME = 10 * 1024 * 1024
const RE_RESUME = /\.(pdf|docx?)$/i
const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const recipients = () => (process.env.MAIL_TO || '').split(',').map((s) => s.trim()).filter(Boolean)
const smtpReady = () => Boolean(process.env.SMTP_HOST && recipients().length)

let transporter
const mailer = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE !== 'false',
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
      // 前端等待上限 20s,服务端必须更早给出结论,否则客户端会误判失败
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    })
  }
  return transporter
}

const send = async (res, { subject, text, replyTo, attachments }) => {
  if (!smtpReady()) return res.status(503).json({ error: 'mail service not configured' })
  try {
    await mailer().sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: recipients(),
      replyTo: replyTo || undefined,
      subject,
      text,
      attachments,
    })
    res.json({ ok: true })
  } catch (e) {
    console.error('[mail] send failed:', e.message)
    res.status(502).json({ error: 'mail send failed' })
  }
}

const meta = (req) => `时间:${new Date().toISOString()}\nIP:${req.ip}\n来源页:${req.get('referer') || '-'}`

const router = Router()

router.post('/contact', formLimiter, (req, res) => {
  const b = req.body ?? {}
  const f = { name: str(b.name, 50), email: str(b.email, 100), phone: str(b.phone, 30), message: str(b.message, 2000) }
  if (!f.name || !f.message || !RE_EMAIL.test(f.email)) return res.status(400).json({ error: 'invalid fields' })
  return send(res, {
    subject: `[官网联系] ${f.name}`,
    replyTo: f.email,
    text: `姓名:${f.name}\n邮箱:${f.email}\n电话:${f.phone || '-'}\n\n留言:\n${f.message}\n\n${meta(req)}`,
  })
})

// 简历只在内存中流转并作为附件发出,不落盘(server/uploads 是公开静态目录,不能存简历)
// defParamCharset:busboy 默认按 latin1 解码文件名,中文简历名会乱码,须显式 utf8
const resume = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_RESUME, files: 1 },
  defParamCharset: 'utf8',
  fileFilter: (_req, file, cb) => cb(null, RE_RESUME.test(file.originalname)),
})
const withResume = (req, res, next) =>
  resume.single('resume')(req, res, (err) => {
    if (err?.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ error: 'resume too large (max 10MB)' })
    if (err) return res.status(400).json({ error: 'upload error' })
    next()
  })

router.post('/apply', formLimiter, withResume, (req, res) => {
  const b = req.body ?? {}
  const f = {
    position: str(b.position, 100),
    name: str(b.name, 50),
    phone: str(b.phone, 30),
    email: str(b.email, 100),
    message: str(b.message, 2000),
  }
  if (!f.name || !f.phone || (f.email && !RE_EMAIL.test(f.email))) return res.status(400).json({ error: 'invalid fields' })
  if (!req.file) return res.status(400).json({ error: 'resume required (pdf/doc/docx)' })
  const filename = req.file.originalname.replace(/[\\/]/g, '_')
  return send(res, {
    subject: `[职位申请] ${f.position || '未指定职位'} - ${f.name}`,
    replyTo: f.email,
    text: `应聘职位:${f.position || '-'}\n姓名:${f.name}\n电话:${f.phone}\n邮箱:${f.email || '-'}\n\n个人简介:\n${f.message || '-'}\n\n${meta(req)}`,
    attachments: [{ filename, content: req.file.buffer }],
  })
})

export default router
