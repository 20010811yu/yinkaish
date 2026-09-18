// 荣誉图片清晰化处理:宽度归一 800px、锐化、对比度增强
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const srcDir = 'D:/OneDrive/桌面/网站/image/荣誉'
const outDir = 'src/assets/honors'

// 重要程度排序
const order = ['honor1.jpg', 'honor2.png', 'honor4.png', 'honor5.png', 'honor6.png', 'honor7.png', 'honor8.png']

fs.mkdirSync(outDir, { recursive: true })

async function run() {
  let i = 0
  for (const file of order) {
    i++
    const out = path.join(outDir, `honor-${String(i).padStart(2, '0')}.jpg`)
    await sharp(path.join(srcDir, file))
      .resize({ width: 800, withoutEnlargement: false })
      .sharpen({ sigma: 1.2, m1: 1, m2: 0.5 })
      .normalise({ lower: 1, upper: 99 })
      .modulate({ brightness: 1.04, saturation: 1.05 })
      .jpeg({ quality: 85 })
      .toFile(out)
    console.log('done', out)
  }
}

run()
