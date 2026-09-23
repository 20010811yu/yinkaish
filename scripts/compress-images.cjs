// 压缩大图:timeline 全部(照片 png→jpg) + 首页轮播 banner;原文件备份到 .backup-images/(验证后删除)
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const BACKUP = path.join(ROOT, '.backup-images')

const jobs = [
  // timeline:限宽 1400 JPEG q78
  ...fs.readdirSync(path.join(ROOT, 'src/assets/timeline')).map((f) => ({
    file: `src/assets/timeline/${f}`,
    width: 1400,
    quality: 78,
  })),
  // 首页轮播:限宽 1920 JPEG q75
  ...[
    'banner-home.jpg',
    'banner-pv.jpg',
    'banner-sunrise.png',
    'banner-cooperation.jpg',
    'banner-car.jpg',
    'banner-vision.jpg',
  ].map((f) => ({
    file: `src/assets/${f}`,
    width: 1920,
    quality: 75,
  })),
]

;(async () => {
  fs.mkdirSync(BACKUP, { recursive: true })
  let totalBefore = 0
  let totalAfter = 0
  for (const job of jobs) {
    const abs = path.join(ROOT, job.file)
    if (!fs.existsSync(abs)) {
      console.log(`skip (missing): ${job.file}`)
      continue
    }
    const buf = fs.readFileSync(abs)
    const out = await sharp(buf)
      .resize({ width: job.width, withoutEnlargement: true })
      .jpeg({ quality: job.quality, mozjpeg: true })
      .toBuffer()
    // 统一输出 jpg 扩展名
    const jpgPath = abs.replace(/\.(png|jpeg)$/i, '.jpg')
    const relIn = path.relative(ROOT, abs)
    const relOut = path.relative(ROOT, jpgPath)
    // 备份原文件
    fs.mkdirSync(path.dirname(path.join(BACKUP, relIn)), { recursive: true })
    fs.copyFileSync(abs, path.join(BACKUP, relIn))
    if (jpgPath !== abs) fs.unlinkSync(abs)
    fs.writeFileSync(jpgPath, out)
    totalBefore += buf.length
    totalAfter += out.length
    console.log(
      `${relIn}${relOut !== relIn ? ` -> ${relOut}` : ''}: ${(buf.length / 1024).toFixed(0)}KB -> ${(out.length / 1024).toFixed(0)}KB`
    )
  }
  console.log(`TOTAL: ${(totalBefore / 1048576).toFixed(1)}MB -> ${(totalAfter / 1048576).toFixed(1)}MB`)
})()
