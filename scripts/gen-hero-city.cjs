/**
 * 生成「现代科技城市」首页主视觉 SVG(src/assets/hero-city.svg)
 * 主题:深绿渐变夜空 + 日出光晕 + 三层城市天际线 + 楼宇灯光矩阵 +
 *      电路走线 + 数据流光柱 + 透视网格地面 + 光伏板前景(呼应公司光伏业务)
 * 运行:node scripts/gen-hero-city.cjs(纯字符串拼装,无依赖,种子随机可复现)
 */
const fs = require('fs')
const path = require('path')

const W = 1920
const H = 1080

/* 种子伪随机:保证每次生成结果一致 */
let seed = 20260918
const rand = () => {
  seed = (seed * 9301 + 49297) % 233280
  return seed / 233280
}

/* ---------- 天空与光晕 ---------- */
const sky = `
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#02120a"/>
      <stop offset="45%" stop-color="#04331f"/>
      <stop offset="78%" stop-color="#065c33"/>
      <stop offset="100%" stop-color="#0a7a44"/>
    </linearGradient>
    <radialGradient id="sun" cx="50%" cy="100%" r="60%">
      <stop offset="0%" stop-color="#b9f6d3" stop-opacity="0.95"/>
      <stop offset="28%" stop-color="#57e39a" stop-opacity="0.55"/>
      <stop offset="60%" stop-color="#00a651" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#00a651" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="beam" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#6ee7a8" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#6ee7a8" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0d5c36"/>
      <stop offset="55%" stop-color="#083f26"/>
      <stop offset="100%" stop-color="#062b1b"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e8fff2" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#e8fff2" stop-opacity="0.02"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#sky)"/>
  <rect width="${W}" height="${H}" fill="url(#sun)"/>`

/* ---------- 星点与漂浮粒子 ---------- */
let particles = ''
for (let i = 0; i < 90; i++) {
  const x = (rand() * W).toFixed(1)
  const y = (rand() * H * 0.62).toFixed(1)
  const r = (rand() * 1.8 + 0.4).toFixed(2)
  const o = (rand() * 0.5 + 0.15).toFixed(2)
  particles += `<circle cx="${x}" cy="${y}" r="${r}" fill="#c8f7dd" opacity="${o}"/>`
}

/* ---------- 三层城市天际线(远→近,亮度递减) ---------- */
const buildSkyline = (baseY, maxH, minW, maxW, gapMin, gapMax, fill, windowColor, windowChance) => {
  let x = -40
  let out = ''
  const tops = []
  while (x < W + 40) {
    const bw = Math.round(minW + rand() * (maxW - minW))
    const bh = Math.round(80 + rand() * (maxH - 80))
    const bx = Math.round(x)
    const by = baseY - bh
    out += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh + 10}" fill="${fill}"/>`
    /* 楼顶天线 */
    if (rand() > 0.72) {
      const antennaH = 18 + Math.round(rand() * 26)
      const ax = bx + Math.round(bw * (0.2 + rand() * 0.6))
      out += `<rect x="${ax}" y="${by - antennaH}" width="2" height="${antennaH + 20}" fill="${fill}"/>`
      out += `<circle cx="${ax + 1}" cy="${by - antennaH}" r="2.5" fill="#ff8a8a" opacity="0.9"/>`
    }
    /* 窗格灯光 */
    const cols = Math.max(2, Math.floor(bw / 16))
    const rows = Math.max(3, Math.floor(bh / 22))
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        if (rand() < windowChance) {
          const wx = bx + 6 + c * Math.floor((bw - 10) / cols)
          const wy = by + 8 + r * Math.floor((bh - 8) / rows)
          const lit = rand() > 0.3
          out += `<rect x="${wx}" y="${wy}" width="4" height="6" fill="${lit ? windowColor : '#1f4433'}" opacity="${lit ? 0.85 : 0.6}"/>`
        }
      }
    }
    tops.push({ x: bx, w: bw, h: bh })
    x += bw + Math.round(gapMin + rand() * (gapMax - gapMin))
  }
  return { svg: out, tops, baseY }
}

const far = buildSkyline(860, 300, 60, 140, 6, 22, '#07402a', '#9fe8c2', 0.16)
const mid = buildSkyline(920, 420, 80, 200, 10, 34, '#052e1e', '#6ee7a8', 0.13)
const near = buildSkyline(1000, 560, 110, 260, 14, 48, '#031d13', '#3ddc91', 0.10)

/* ---------- 中景地标塔(构图主角,带玻璃幕墙与顶部光冠) ---------- */
const towerX = 1210
const towerW = 190
const towerH = 640
const towerY = 1000 - towerH
let towerWindows = ''
for (let i = 0; i < 30; i++) {
  const wy = towerY + 14 + i * 21
  if (wy > 995) break
  for (let c = 0; c < 5; c++) {
    if (rand() > 0.42) {
      towerWindows += `<rect x="${towerX + 18 + c * 34}" y="${wy}" width="16" height="7" fill="#8ff0bd" opacity="0.8"/>`
    }
  }
}
const tower = `
  <g>
    <rect x="${towerX}" y="${towerY}" width="${towerW}" height="${towerH}" fill="#04291b"/>
    <rect x="${towerX}" y="${towerY}" width="${towerW}" height="${towerH}" fill="url(#glass)"/>
    <rect x="${towerX - 8}" y="${towerY}" width="${towerW + 16}" height="5" fill="#57e39a" opacity="0.9"/>
    <rect x="${towerX + towerW / 2 - 2}" y="${towerY - 120}" width="4" height="120" fill="#04291b"/>
    <circle cx="${towerX + towerW / 2}" cy="${towerY - 122}" r="4" fill="#ff8a8a"/>
    <circle cx="${towerX + towerW / 2}" cy="${towerY - 122}" r="9" fill="none" stroke="#6ee7a8" stroke-opacity="0.5"/>
    ${towerWindows}
  </g>`

/* ---------- 数据流光柱(从近景楼群升起) ---------- */
let beams = ''
const beamTops = near.tops.filter((_, i) => i % 4 === 1).slice(2, 9)
for (const b of beamTops) {
  const cx = b.x + b.w / 2
  const bw = 3 + rand() * 5
  const bh = 120 + rand() * 260
  beams += `<rect x="${(cx - bw / 2).toFixed(1)}" y="${(1000 - b.h - bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" fill="url(#beam)" opacity="${(0.25 + rand() * 0.45).toFixed(2)}"/>`
  beams += `<circle cx="${cx.toFixed(1)}" cy="${(1000 - b.h - bh).toFixed(1)}" r="${(2 + rand() * 2).toFixed(1)}" fill="#b9f6d3" opacity="0.9"/>`
}

/* ---------- 电路走线(地平线附近横向数据总线) ---------- */
let circuits = ''
const trace = (x1, y1, x2, y2, o = 0.6) => {
  const midX = x1 + (x2 - x1) * (0.3 + rand() * 0.4)
  circuits += `<path d="M${x1} ${y1} L${midX.toFixed(0)} ${y1} L${midX.toFixed(0)} ${y2} L${x2} ${y2}" fill="none" stroke="#00d566" stroke-width="1.6" opacity="${o.toFixed(2)}"/>`
  circuits += `<circle cx="${x2}" cy="${y2}" r="3" fill="#00d566" opacity="${o.toFixed(2)}"/>`
  circuits += `<circle cx="${x1}" cy="${y1}" r="2.2" fill="#57e39a" opacity="${o.toFixed(2)}"/>`
}
for (let i = 0; i < 14; i++) {
  trace(
    Math.round(rand() * W),
    Math.round(880 + rand() * 100),
    Math.round(rand() * W),
    Math.round(880 + rand() * 120),
    0.25 + rand() * 0.4,
  )
}

/* ---------- 透视网格地面(科技地平) ---------- */
let grid = ''
const horizon = 1000
for (let i = -14; i <= 14; i++) {
  const x = 960 + i * 150
  grid += `<line x1="${960 + i * 46}" y1="${horizon}" x2="${x}" y2="${H}" stroke="#00d566" stroke-width="1" opacity="${Math.max(0.05, 0.16 - Math.abs(i) * 0.006).toFixed(3)}"/>`
}
for (let i = 1; i <= 9; i++) {
  const t = i / 9
  const y = horizon + Math.pow(t, 1.8) * (H - horizon)
  grid += `<line x1="0" y1="${y.toFixed(1)}" x2="${W}" y2="${y.toFixed(1)}" stroke="#00d566" stroke-width="1" opacity="${(0.05 + t * 0.12).toFixed(3)}"/>`
}

/* ---------- 前景光伏板阵列(透视两排,呼应公司业务) ---------- */
let panels = ''
const drawPanel = (cx, cy, w, h, tilt) => {
  const cells = [1, 2]
    .map((i) => `<line x1="${(-w / 2 + (w / 3) * i).toFixed(1)}" y1="${-h / 2}" x2="${(-w / 2 + (w / 3) * i).toFixed(1)}" y2="${h / 2}" stroke="#0fa35c" stroke-width="0.8" opacity="0.8"/>`)
    .join('')
  return `
  <g transform="translate(${cx.toFixed(1)} ${cy.toFixed(1)}) rotate(${tilt.toFixed(1)})">
    <rect x="${(-w / 2).toFixed(1)}" y="${(-h / 2).toFixed(1)}" width="${w}" height="${h}" rx="3" fill="url(#panel)" stroke="#0fa35c" stroke-width="1.4"/>
    ${cells}
    <rect x="${(-w / 2).toFixed(1)}" y="${(-h / 2).toFixed(1)}" width="${w}" height="${(h * 0.18).toFixed(1)}" rx="2" fill="#57e39a" opacity="0.35"/>
  </g>`
}
for (let i = 0; i < 7; i++) {
  const px = 120 + i * 300 + rand() * 40
  panels += drawPanel(px, 1046, 210, 58, -2 + rand() * 4)
  panels += `<rect x="${(px - 3).toFixed(1)}" y="1046" width="6" height="34" fill="#04291b"/>`
}
/* 近处大板剪影 */
panels += drawPanel(430, 1074, 340, 92, -3)
panels += `<rect x="427" y="1074" width="7" height="6" fill="#04291b"/>`

/* ---------- 组装 ---------- */
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
${sky}
${particles}
<g>${far.svg}</g>
<g>${mid.svg}</g>
<g>${circuits}</g>
<g>${near.svg}</g>
${tower}
<g>${beams}</g>
<g>${grid}</g>
<g>${panels}</g>
<rect x="0" y="${horizon}" width="${W}" height="4" fill="#57e39a" opacity="0.5"/>
</svg>
`

const outPath = path.join(__dirname, '..', 'src', 'assets', 'hero-city.svg')
fs.writeFileSync(outPath, svg, 'utf8')
console.log(`written: ${outPath} (${(svg.length / 1024).toFixed(1)} KB)`)
