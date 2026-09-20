/**
 * 用本地设备图片库(D:\OneDrive\桌面\网站\image\设备)替换产品卡片图(一次性迁移脚本)
 * - sharp:裁白边、限宽 800、按源格式输出(jpg q80 / png palette)
 * - YK-6B 用 YK-6E(卧冲短边) 图:资料文件夹为新一代命名,设备与画册 YK-6B 同为"卧冲短边"
 * 用法: node scripts/replace-product-images.cjs
 */
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const BASE = 'D:/OneDrive/桌面/网站/image/设备'
const DEST = path.join(__dirname, '..', 'src', 'assets', 'products')

/* 卡片文件名 ← 设备库源图 */
const MAP = {
  'yk-6a_banner.png': '光伏边框铝材自动生产线YK-6/YK-6A(立冲长边)/YK-6A.png',
  'yk-6b_banner.jpg': '光伏边框铝材自动生产线YK-6/YK-6E(卧冲短边)/YK-6E.jpg',
  'yk-6w_banner.jpg': '光伏边框铝材自动生产线YK-6/YK-6W(卧冲长边)/YK-6W.jpg',
  'yk-fc-3c_banner.jpg': '光伏边框复合材料自动化生产线YK-FC/YK-FC-3C(长边自动线)/YK-FC-3C.jpg',
  'yk-fc-3d_banner.jpg': '光伏边框复合材料自动化生产线YK-FC/YK-FC-3D(短边自动线)/YK-FC-3D.jpg',
  'yk-fc-3j_banner.jpg': '光伏边框复合材料自动化生产线YK-FC/YK-FC-3J（角码装配机）/YK-FC-3J.jpg',
  'yk-3e_banner.jpg': '自动码垛机/YK-3E(长边自动码垛机)/YK-3E.jpg',
  'yk-3f_banner.jpg': '自动码垛机/YK-3F(短边自动码垛机)/YK-3F.jpg',
  'yk-ol-3i_banner.png': '视觉检测/YK-OL-3I/YK-OL-3I_1.png',
  'yk-zidongsuoluomushengchanxian_banner.jpg': '汽车轻量化/自锁螺母.jpg',
}

;(async () => {
  for (const [dest, src] of Object.entries(MAP)) {
    const srcPath = path.join(BASE, src)
    const outPath = path.join(DEST, dest)
    const isPng = dest.endsWith('.png')
    let pipeline = sharp(srcPath).trim({ threshold: 12 }).resize({ width: 800, withoutEnlargement: true })
    pipeline = isPng
      ? pipeline.png({ compressionLevel: 9, palette: true, quality: 85 })
      : pipeline.flatten({ background: '#ffffff' }).jpeg({ quality: 80, mozjpeg: true })
    await pipeline.toFile(outPath + '.tmp')
    fs.renameSync(outPath + '.tmp', outPath)
    const m = await sharp(outPath).metadata()
    const kb = (fs.statSync(outPath).size / 1024).toFixed(0)
    console.log(`${dest}  ← ${src}  → ${m.width}x${m.height} ${kb}KB`)
  }
  console.log('done')
})()
