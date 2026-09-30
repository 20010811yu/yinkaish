// 图片上传:登录保护;服务端自动重命名(时间戳+随机,不保留原始文件名,规避中文/空格/重名)
import { Router } from 'express'
import multer from 'multer'
import path from 'node:path'
import fs from 'node:fs'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const uploadsDir = path.resolve(__dirname, '../../../uploads')
fs.mkdirSync(uploadsDir, { recursive: true })

// mimetype → 安全扩展名白名单
const EXT_WHITELIST = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp' }

const pad = (n) => String(n).padStart(2, '0')
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const d = new Date()
    const ts = `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`
    const rand = crypto.randomBytes(2).toString('hex')
    cb(null, `img-${ts}-${rand}.${EXT_WHITELIST[file.mimetype]}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => cb(null, Boolean(EXT_WHITELIST[file.mimetype])),
})

const router = Router()
// 挂载于 /api/admin,显式声明 /upload(挂载根 '/' 只匹配前缀本身)
router.post('/upload', upload.single('file'), (req, res) => {
  res.json({ name: req.file.filename, url: `/uploads/${req.file.filename}` })
})

export default router
