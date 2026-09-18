// 荣誉图片清晰化处理:宽度归一 800px、锐化、对比度增强
// honor-02 使用 honor3.png(更清晰的专精特新牌照)
// honor-06/honor-07 黑底照片:居中裁切黑色区域后衬白色边距
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const srcDir = 'D:/OneDrive/桌面/网站/image/荣誉'
const outDir = 'src/assets/honors'

fs.mkdirSync(outDir, { recursive: true })

async function processStandard(file, out, width = 800) {
  await sharp(path.join(srcDir, file))
    .resize({ width, withoutEnlargement: false })
    .sharpen({ sigma: 1.2, m1: 1, m2: 0.5 })
    .normalise({ lower: 1, upper: 99 })
    .modulate({ brightness: 1.04, saturation: 1.05 })
    .jpeg({ quality: 85 })
    .toFile(path.join(outDir, out))
  console.log('done', out)
}

// 黑底照片:裁切中心区域(去除大部分黑布背景)后衬白色边距
async function processBlackBg(file, out, crop) {
  const img = sharp(path.join(srcDir, file))
  const meta = await img.metadata()
  const region = {
    left: Math.round(meta.width * crop.l),
    top: Math.round(meta.height * crop.t),
    width: Math.round(meta.width * crop.w),
    height: Math.round(meta.height * crop.h),
  }
  await img
    .extract(region)
    .resize({ width: 800, withoutEnlargement: false })
    .sharpen({ sigma: 1.2, m1: 1, m2: 0.5 })
    .normalise({ lower: 1, upper: 99 })
    .modulate({ brightness: 1.06 })
    .extend({ top: 24, bottom: 24, left: 24, right: 24, background: '#ffffff' })
    .jpeg({ quality: 85 })
    .toFile(path.join(outDir, out))
  console.log('done', out)
}

async function run() {
  // 1. 荣誉证书合集(综合)
  await processStandard('honor1.jpg', 'honor-01.jpg')
  // 2. 专精特新(honor2.png 已由用户更新为清晰版)
  await processStandard('honor2.png', 'honor-02.jpg')
  // 3. 质量管理体系认证(中文)
  await processStandard('honor4.png', 'honor-03.jpg')
  // 4. 质量管理体系认证(英文)
  await processStandard('honor5.png', 'honor-04.jpg')
  // 5. 安全生产标准化
  await processStandard('honor6.png', 'honor-05.jpg')
  // 6. 实用新型专利(黑底裁切)
  await processBlackBg('honor7.png', 'honor-06.jpg', { l: 0.24, t: 0.1, w: 0.62, h: 0.74 })
  // 7. 专利登记簿(黑底裁切)
  await processBlackBg('honor8.png', 'honor-07.jpg', { l: 0.24, t: 0.1, w: 0.55, h: 0.68 })
}

run()
