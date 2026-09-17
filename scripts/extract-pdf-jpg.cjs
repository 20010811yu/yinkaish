// 从 PDF 中提取内嵌 JPEG 图片(扫描 FFD8...FFD9 标记)
const fs = require('fs')
const buf = fs.readFileSync(process.argv[2])
const outDir = process.argv[3]
fs.mkdirSync(outDir, { recursive: true })
let count = 0
for (let i = 0; i < buf.length - 3; i++) {
  if (buf[i] === 0xff && buf[i + 1] === 0xd8 && buf[i + 2] === 0xff) {
    // 找对应的 FFD9 结束标记
    for (let j = i + 3; j < buf.length - 1; j++) {
      if (buf[j] === 0xff && buf[j + 1] === 0xd9) {
        const len = j + 2 - i
        if (len > 20000) {
          // 忽略过小的图
          const name = `${outDir}/pdf_img_${String(++count).padStart(2, '0')}.jpg`
          fs.writeFileSync(name, buf.subarray(i, j + 2))
        }
        i = j + 1
        break
      }
    }
  }
}
console.log('extracted', count, 'jpegs')
