// 生成首页轮播科技感主视觉 SVG
const fs = require('fs')
const W = 1600
const H = 650

const defs = `<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#04140d"/>
    <stop offset="0.55" stop-color="#07301d"/>
    <stop offset="0.8" stop-color="#0a4529"/>
    <stop offset="1" stop-color="#0d5533"/>
  </linearGradient>
  <radialGradient id="sun" cx="0.72" cy="0.52" r="0.5">
    <stop offset="0" stop-color="#8df5b9" stop-opacity="0.9"/>
    <stop offset="0.25" stop-color="#2ecc71" stop-opacity="0.45"/>
    <stop offset="1" stop-color="#2ecc71" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="panel" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#123c26" stop-opacity="0.95"/>
    <stop offset="1" stop-color="#051d12" stop-opacity="0.95"/>
  </linearGradient>
  <linearGradient id="beam" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#4ade8f" stop-opacity="0"/>
    <stop offset="0.5" stop-color="#7fe3ae" stop-opacity="0.5"/>
    <stop offset="1" stop-color="#4ade8f" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="wire" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#00a651" stop-opacity="0"/>
    <stop offset="0.5" stop-color="#4ade8f" stop-opacity="0.7"/>
    <stop offset="1" stop-color="#00a651" stop-opacity="0"/>
  </linearGradient>
</defs>`

// 地平线光伏板阵列(透视:近大远小)
let panels = ''
const horizonY = 470
for (let row = 0; row < 5; row++) {
  const t = row / 4 // 0 最远 1 最近
  const y = horizonY + Math.pow(t, 1.6) * 180
  const pw = 60 + t * 260
  const ph = 8 + t * 46
  const gap = 26 + t * 130
  const skew = -18 - t * 36
  let x = 420 - row * 130
  while (x < W + 200) {
    const pts = `${x},${y - ph} ${x + pw},${y - ph} ${x + pw + skew},${y} ${x + skew},${y}`
    const op = 0.25 + t * 0.6
    panels += `<polygon points="${pts}" fill="url(#panel)" stroke="#3ddc8b" stroke-width="${(0.6 + t * 1.4).toFixed(2)}" stroke-opacity="${(op * 0.9).toFixed(2)}"/>`
    if (t > 0.3) {
      for (let g = 1; g < 6; g++) {
        const gx = x + (pw / 6) * g
        panels += `<line x1="${gx}" y1="${y - ph}" x2="${gx + skew}" y2="${y}" stroke="#3ddc8b" stroke-opacity="${(op * 0.28).toFixed(2)}" stroke-width="0.8"/>`
      }
    }
    panels += `<line x1="${x + pw / 2 + skew / 2}" y1="${y}" x2="${x + pw / 2 + skew / 2}" y2="${y + 6 + t * 16}" stroke="#1f7a4c" stroke-width="${1 + t * 2}" stroke-opacity="${op}"/>`
    x += pw + gap
  }
}

// 光点粒子(伪随机)
let dots = ''
let seed = 42
const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647 }
for (let i = 0; i < 90; i++) {
  const dx = rnd() * W
  const dy = rnd() * H * 0.75
  const r = rnd() * 2.2 + 0.4
  const op = (rnd() * 0.5 + 0.15).toFixed(2)
  dots += `<circle cx="${dx.toFixed(1)}" cy="${dy.toFixed(1)}" r="${r.toFixed(1)}" fill="#7fe3ae" opacity="${op}"/>`
}

// 电路走线(右上角)
let circuit = ''
;[70, 110, 150].forEach((y, idx) => {
  const x0 = 1050 + idx * 90
  circuit += `<path d="M ${x0} ${y} h 130 l 26 26 h 90" fill="none" stroke="url(#wire)" stroke-width="1.6"/>
    <circle cx="${x0 + 246}" cy="${y + 26}" r="3" fill="#7fe3ae"/>`
})

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
${defs}
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<rect width="${W}" height="${H}" fill="url(#sun)"/>
<g opacity="0.5">${circuit}</g>
${dots}
<g opacity="0.85"><line x1="0" y1="${horizonY}" x2="${W}" y2="${horizonY}" stroke="#4ade8f" stroke-width="2" stroke-opacity="0.8"/>
<rect x="0" y="${horizonY - 26}" width="${W}" height="26" fill="url(#beam)" opacity="0.5"/></g>
${panels}
<g opacity="0.55">
  <rect x="120" y="90" width="2" height="120" fill="#4ade8f" opacity="0.7"/>
  <rect x="132" y="90" width="2" height="120" fill="#4ade8f" opacity="0.4"/>
  <rect x="144" y="90" width="2" height="120" fill="#4ade8f" opacity="0.2"/>
</g>
</svg>`

fs.writeFileSync('src/assets/hero-tech.svg', svg)
console.log('written', svg.length, 'bytes')
