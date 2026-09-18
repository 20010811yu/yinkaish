/**
 * 对象级 PDF 图片提取器:解析所有 /Subtype /Image XObject
 * - DCTDecode → 直接存 .jpg
 * - JPXDecode  → 存 .jp2(浏览器/sharp 不支持时再想办法)
 * - FlateDecode → zlib 解压存 .bin(带宽高/色彩信息文件名,供后续 sharp 原始数据转换)
 * 用法: node scripts/extract-pdf-images.cjs <pdf> <outdir>
 */
const fs = require('fs')
const path = require('path')
const zlib = require('zlib')

const [, , pdfPath, outDir] = process.argv
if (!pdfPath || !outDir) {
  console.error('usage: node extract-pdf-images.cjs <pdf> <outdir>')
  process.exit(1)
}
fs.mkdirSync(outDir, { recursive: true })

const buf = fs.readFileSync(pdfPath)
const s = buf.toString('latin1')

/* 逐个 "N G obj" 对象扫描 */
const objRe = /(\d+)\s+(\d+)\s+obj\b/g
const objs = []
let m
while ((m = objRe.exec(s))) objs.push({ num: +m[1], start: m.index })

let count = { jpg: 0, jp2: 0, flate: 0 }
for (let i = 0; i < objs.length; i++) {
  const start = objs[i].start
  const end = i + 1 < objs.length ? objs[i + 1].start : buf.length
  const chunk = s.slice(start, end)
  if (!chunk.includes('/Subtype') || !chunk.includes('/Image')) continue

  const dictMatch = chunk.match(/^([\d\s]+obj\s*<<[\s\S]*?>>)(\s*stream\r?\n?)/)
  if (!dictMatch) continue
  const dict = dictMatch[1]
  const dataStart = start + dictMatch[1].length + dictMatch[2].length

  const width = (dict.match(/\/Width\s+(\d+)/) || [])[1]
  const height = (dict.match(/\/Height\s+(\d+)/) || [])[1]
  const bpc = (dict.match(/\/BitsPerComponent\s+(\d+)/) || [])[1] || '8'
  const cs = (dict.match(/\/ColorSpace\s*(\/[A-Za-z0-9]+|\[[^\]]*\])/) || [])[1] || '?'

  /* 找 endstream */
  const endIdx = s.indexOf('endstream', dataStart)
  if (endIdx < 0) continue
  let dataEnd = endIdx
  /* stream 数据以 EOL 结尾约定:去掉 endstream 前的 \r\n */
  if (s[dataEnd - 1] === '\n') dataEnd--
  if (s[dataEnd - 1] === '\r') dataEnd--

  const num = objs[i].num
  /* 过滤器链:数组按序处理(常见 [/FlateDecode /DCTDecode] 双重压缩) */
  let filters = []
  const arrMatch = dict.match(/\/Filter\s*\[([^\]]*)\]/)
  if (arrMatch) filters = arrMatch[1].match(/\/[A-Za-z0-9]+/g) || []
  else {
    const single = (dict.match(/\/Filter\s*(\/[A-Za-z0-9]+)/) || [])[1]
    if (single) filters = [single]
  }

  let data = buf.subarray(dataStart, dataEnd)
  let ext = null
  for (const f of filters) {
    if (f === '/FlateDecode') {
      try { data = zlib.inflateSync(data) } catch { data = null; break }
    } else if (f === '/DCTDecode') ext = 'jpg'
    else if (f === '/JPXDecode') ext = 'jp2'
    else if (f === '/Fl') ext = ext // noop
    else ext = ext // 未知过滤器保持已判定的
  }
  if (!data || !ext) {
    if (data && !ext && filters.length === 1 && filters[0] === '/FlateDecode') {
      /* 纯 Flate 位图 */
      const f2 = path.join(outDir, `img${String(num).padStart(3, '0')}_${width}x${height}_bpc${bpc}${cs.slice(0, 20).replace(/[^\w]/g, '')}.bin`)
      fs.writeFileSync(f2, data)
      count.flate++
    }
    continue
  }
  const out = path.join(outDir, `img${String(num).padStart(3, '0')}_${width}x${height}.${ext}`)
  fs.writeFileSync(out, data)
  count[ext]++
}
console.log('extracted:', count)
