/**
 * 用画册 PDF 高清原图替换产品卡片图(一次性迁移脚本)
 * - 坐标配对依据 map 结果:跨页左半=第一个型号,右半=第二个型号
 * - sharp 处理:CMYK→sRGB、裁白边、白底填充、限宽 800、PNG 输出(文件名不变)
 * 用法: node scripts/upgrade-product-images.cjs
 */
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const SRC = path.join(__dirname, '..', '.tmp_pdf_img')
const DEST = path.join(__dirname, '..', 'src', 'assets', 'products')

/* 型号卡片文件名 ← PDF 提取图 */
const MAP = {
  'yk-6a_banner.png': 'img140_783x553.jpg', // 印刷12 左
  'yk-6w_banner.png': 'img165_912x645.jpg', // 印刷14 左
  'yk-fc-3c_banner.png': 'img166_751x469.jpg', // 印刷15 右
  'yk-fc-3d_banner.png': 'img191_871x616.jpg', // 印刷16 左
  'yk-fc-3j_banner.png': 'img190_744x353.jpg', // 印刷17 右
  'yk-3e_banner.png': 'img217_745x526.jpg', // 印刷18 左
  'yk-3f_banner.png': 'img216_732x517.jpg', // 印刷19 右
  'yk-xingcailawanji_banner.png': 'img254_658x372.jpg', // 印刷22 左
  'yk-ol-2i_banner.png': 'img265_585x413.jpg', // 印刷25 上
  'yk-ol-3i_banner.png': 'img266_556x393.jpg', // 印刷25 下
}

;(async () => {
  for (const [dest, src] of Object.entries(MAP)) {
    const srcPath = path.join(SRC, src)
    const outPath = path.join(DEST, dest)
    await sharp(srcPath)
      .flatten({ background: '#ffffff' })
      .trim({ threshold: 12 })
      .resize({ width: 800, withoutEnlargement: true })
      .png({ compressionLevel: 9 })
      .toFile(outPath + '.tmp')
    fs.renameSync(outPath + '.tmp', outPath)
    const m = await sharp(outPath).metadata()
    const kb = (fs.statSync(outPath).size / 1024).toFixed(0)
    console.log(`${dest}  ← ${src}  → ${m.width}x${m.height} ${kb}KB`)
  }
  console.log('done')
})()
