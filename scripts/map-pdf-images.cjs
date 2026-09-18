/**
 * 页面-图片映射 v2:经 /Kids 取权威页序,递归展开 Form XObject,
 * 输出每页引用的图片对象(名称/对象号/像素尺寸/过滤器)
 * 用法: node scripts/map-pdf-images.cjs <pdf>
 */
const fs = require('fs')
const zlib = require('zlib')

const [, , pdfPath] = process.argv
const buf = fs.readFileSync(pdfPath)
const s = buf.toString('latin1')

const objRe = /(\d+)\s+(\d+)\s+obj\b/g
const byNum = new Map()
let m
while ((m = objRe.exec(s))) {
  const num = +m[1]
  if (!byNum.has(num)) byNum.set(num, m.index)
}
const getObj = (num) => {
  const start = byNum.get(num)
  if (start === undefined) return null
  const nexts = [...byNum.values()].filter((v) => v > start).sort((a, b) => a - b)
  const end = nexts[0] ?? s.length
  return s.slice(start, Math.min(start + 300000, end))
}
const decomp = (num) => {
  const chunk = getObj(num)
  if (!chunk) return ''
  const sm = chunk.match(/stream\r?\n/)
  if (!sm) return ''
  const start = chunk.indexOf(sm[0]) + sm[0].length
  const end = chunk.indexOf('endstream', start)
  let e = end
  if (chunk[e - 1] === '\n') e--
  if (chunk[e - 1] === '\r') e--
  try { return zlib.inflateSync(Buffer.from(chunk.slice(start, e), 'latin1')).toString('latin1') } catch { return '' }
}

/* 根 Catalog → Pages → Kids 页序 */
const rootRef = (s.match(/\/Type\s*\/Catalog[\s\S]{0,200}?\/Pages\s+(\d+)\s+\d+\s+R/) || s.match(/\/Pages\s+(\d+)\s+\d+\s+R[\s\S]{0,100}?\/Type\s*\/Catalog/) || [])[1]
const rootPages = getObj(+rootRef)
const kidsMatch = rootPages.match(/\/Kids\s*\[([^\]]*)\]/)
const kids = [...(kidsMatch ? kidsMatch[1].matchAll(/(\d+)\s+\d+\s+R/g) : [])].map((k) => +k[1])
console.log('catalog pages obj:', rootRef, '| kids:', kids.length)

const collectImages = (chunk, acc, depth = 0, seen = new Set()) => {
  /* Resources /XObject:内联 dict 或间接引用 */
  let xo = chunk
  const xr = chunk.match(/\/XObject\s+(\d+)\s+\d+\s+R/)
  if (xr) xo = getObj(+xr[1]) || chunk
  for (const im of xo.matchAll(/\/([A-Za-z0-9_.]+)\s+(\d+)\s+\d+\s+R/g)) {
    const [name, num] = [im[1], +im[2]]
    if (seen.has(num)) continue
    seen.add(num)
    const target = getObj(num)
    if (!target) continue
    if (/\/Subtype\s*\/Image/.test(target)) {
      const w = (target.match(/\/Width\s+(\d+)/) || [])[1]
      const h = (target.match(/\/Height\s+(\d+)/) || [])[1]
      const filt = [...target.matchAll(/\/(DCTDecode|JPXDecode|FlateDecode)/g)].map((f) => f[1]).join('+')
      acc.push({ name, num, px: w && h ? `${w}x${h}` : '?', filt })
    } else if (/\/Subtype\s*\/Form/.test(target) && depth < 3) {
      collectImages(target, acc, depth + 1, seen)
      /* Form 自身内容流里引用的其它对象(资源可能挂在 Form dict) */
      const fc = decomp(num)
      for (const dn of fc.matchAll(/\/([A-Za-z0-9_.]+)\s+Do/g)) {
        const fm = xo.match(new RegExp(`/${dn[1]}\\s+(\\d+)\\s+\\d+\\s+R`))
        if (fm && !seen.has(+fm[1])) {
          const t2 = getObj(+fm[1])
          if (t2 && /\/Subtype\s*\/Image/.test(t2)) {
            const w = (t2.match(/\/Width\s+(\d+)/) || [])[1]
            const h = (t2.match(/\/Height\s+(\d+)/) || [])[1]
            acc.push({ name: dn[1], num: +fm[1], px: w && h ? `${w}x${h}` : '?', filt: 'in-form' })
          }
        }
      }
    }
  }
}

kids.forEach((k, idx) => {
  const chunk = getObj(k)
  if (!chunk) return
  const acc = []
  collectImages(chunk, acc)
  if (acc.length) {
    console.log(`\nPAGE ${idx + 1} (obj${k}):`)
    for (const a of acc) console.log(`  /${a.name} obj${a.num} ${a.px} ${a.filt}`)
  }
})
