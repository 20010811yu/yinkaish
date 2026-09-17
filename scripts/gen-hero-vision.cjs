// 生成"视觉检测"轮播主视觉 SVG(镜头光圈 + 扫描框 + 边框剖面)
const fs = require('fs')
const W = 1600
const H = 650

const defs = `<defs>
  <linearGradient id="vbg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#03100a"/>
    <stop offset="0.6" stop-color="#06291a"/>
    <stop offset="1" stop-color="#093c24"/>
  </linearGradient>
  <radialGradient id="lensGlow" cx="0.5" cy="0.5" r="0.5">
    <stop offset="0" stop-color="#7fe3ae" stop-opacity="0.55"/>
    <stop offset="0.6" stop-color="#10b063" stop-opacity="0.18"/>
    <stop offset="1" stop-color="#10b063" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="vglow" cx="0.78" cy="0.45" r="0.45">
    <stop offset="0" stop-color="#2ecc71" stop-opacity="0.35"/>
    <stop offset="1" stop-color="#2ecc71" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="scanline" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#4ade8f" stop-opacity="0"/>
    <stop offset="0.5" stop-color="#a7f3cf" stop-opacity="0.9"/>
    <stop offset="1" stop-color="#4ade8f" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="frameBar" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#1c5a38"/>
    <stop offset="1" stop-color="#0a2c1a"/>
  </linearGradient>
  <linearGradient id="vwire" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#00a651" stop-opacity="0"/>
    <stop offset="0.5" stop-color="#4ade8f" stop-opacity="0.6"/>
    <stop offset="1" stop-color="#00a651" stop-opacity="0"/>
  </linearGradient>
</defs>`

// 伪随机
let seed = 7
const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647 }
let dots = ''
for (let i = 0; i < 110; i++) {
  const dx = rnd() * W
  const dy = rnd() * H
  const r = rnd() * 2 + 0.3
  const op = (rnd() * 0.45 + 0.12).toFixed(2)
  dots += `<circle cx="${dx.toFixed(1)}" cy="${dy.toFixed(1)}" r="${r.toFixed(1)}" fill="#7fe3ae" opacity="${op}"/>`
}

// 镜头光圈(右侧主体)
const cx = 1150
const cy = 320
let lens = `<circle cx="${cx}" cy="${cy}" r="300" fill="url(#lensGlow)"/>`
for (let i = 0; i < 5; i++) {
  const r = 90 + i * 42
  lens += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#3ddc8b" stroke-width="${5 - i * 0.8}" stroke-opacity="${(0.65 - i * 0.1).toFixed(2)}" stroke-dasharray="${i === 2 ? '12 10' : 'none'}"/>`
}
for (let i = 0; i < 8; i++) {
  const a1 = (i / 8) * Math.PI * 2
  const a2 = a1 + Math.PI / 5
  const x1 = cx + Math.cos(a1) * 96
  const y1 = cy + Math.sin(a1) * 96
  const x2 = cx + Math.cos(a2) * 40
  const y2 = cy + Math.sin(a2) * 40
  lens += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#7fe3ae" stroke-width="2" stroke-opacity="0.5"/>`
}
lens += `<circle cx="${cx}" cy="${cy}" r="34" fill="#0d5533" stroke="#a7f3cf" stroke-width="3"/>
<circle cx="${cx}" cy="${cy}" r="12" fill="#a7f3cf" opacity="0.9"/>`

// 扫描目标框(套住镜头)
const bx = cx - 250
const by = cy - 190
const bw = 500
const bh = 380
const corner = 44
const scan = `<g stroke="#4ade8f" stroke-width="4" fill="none" opacity="0.9">
  <path d="M ${bx} ${by + corner} v -${corner} h ${corner}"/>
  <path d="M ${bx + bw - corner} ${by} h ${corner} v ${corner}"/>
  <path d="M ${bx + bw} ${by + bh - corner} v ${corner} h -${corner}"/>
  <path d="M ${bx + corner} ${by + bh} h -${corner} v -${corner}"/>
</g>
<line x1="${bx}" y1="${cy}" x2="${bx + bw}" y2="${cy}" stroke="url(#scanline)" stroke-width="2.5"/>
<text x="${bx + bw - 8}" y="${by - 14}" text-anchor="end" font-family="Consolas, monospace" font-size="20" fill="#7fe3ae" opacity="0.85">YK-OL-2I &lt;= 1.7s</text>`

// 光伏边框剖面(左下输送线)
let frameRow = ''
const fy = 520
const segs = [[70, 210], [300, 430], [520, 660]]
segs.forEach(([x0, x1], i) => {
  const ok = i !== 1
  frameRow += `<rect x="${x0}" y="${fy}" width="${x1 - x0}" height="34" rx="4" fill="url(#frameBar)" stroke="#3ddc8b" stroke-width="1.5" stroke-opacity="0.9"/>
    <rect x="${x0 + 12}" y="${fy - 10}" width="${x1 - x0 - 24}" height="10" rx="3" fill="#0a2c1a" stroke="#3ddc8b" stroke-width="1" stroke-opacity="0.7"/>`
  if (ok) {
    frameRow += `<path d="M ${(x0 + x1) / 2 - 10} ${fy + 52} l 8 10 l 16 -20" stroke="#4ade8f" stroke-width="3" fill="none"/>`
  } else {
    frameRow += `<rect x="${(x0 + x1) / 2 - 16}" y="${fy - 46}" width="34" height="30" fill="none" stroke="#e25555" stroke-width="2.5"/>
    <line x1="${(x0 + x1) / 2 - 16}" y1="${fy - 46}" x2="${(x0 + x1) / 2 + 18}" y2="${fy - 16}" stroke="#e25555" stroke-width="2.5"/>
    <text x="${(x0 + x1) / 2 - 16}" y="${fy - 52}" font-family="Consolas, monospace" font-size="16" fill="#e25555">NG</text>`
  }
})
frameRow += `<line x1="40" y1="${fy + 40}" x2="720" y2="${fy + 40}" stroke="#1f7a4c" stroke-width="3" stroke-opacity="0.9"/>`
for (let x = 60; x < 720; x += 46) {
  frameRow += `<circle cx="${x}" cy="${fy + 52}" r="7" fill="none" stroke="#1f7a4c" stroke-width="2.5"/>`
}

// 数据流走线(镜头 → 检测线)
const wiring = `<path d="M ${cx - 300} ${cy + 160} H 760 V ${fy - 70} H 690" fill="none" stroke="url(#vwire)" stroke-width="1.8"/>
<circle cx="690" cy="${fy - 70}" r="3.5" fill="#7fe3ae"/>`

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${defs}
<rect width="${W}" height="${H}" fill="url(#vbg)"/>
<rect width="${W}" height="${H}" fill="url(#vglow)"/>
${dots}
${wiring}
${frameRow}
${lens}
${scan}
</svg>`

fs.writeFileSync('src/assets/hero-vision.svg', svg)
console.log('written', svg.length, 'bytes')
