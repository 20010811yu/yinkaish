<template>
  <div ref="wrap" class="slide-verify" :data-dev-target="isDev ? targetX : undefined" :class="{ 'slide-verify--done': state === 'done' }">
    <div class="slide-verify__canvas-wrap">
      <canvas ref="bgCanvas" class="slide-verify__bg"></canvas>
      <canvas ref="pieceCanvas" class="slide-verify__piece" :style="{ left: pieceLeft }"></canvas>
      <div v-if="state === 'done'" class="slide-verify__ok">{{ $t('admin.slide.pass') }}</div>
    </div>
    <div class="slide-verify__track">
      <div class="slide-verify__hint" v-if="state !== 'done'">{{ $t('admin.slide.hint') }}</div>
      <div class="slide-verify__hint slide-verify__hint--ok" v-else>{{ $t('admin.slide.hintOk') }}</div>
      <div
        ref="handle"
        class="slide-verify__handle"
        :class="{ 'slide-verify__handle--done': state === 'done' }"
        :style="{ left: handleLeft }"
        @pointerdown="onDown"
      >
        <span class="slide-verify__arrows">»</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// 轻量滑块拼图验证(自实现,零依赖):拖动滑块使拼图块对准缺口,误差 ≤6px 判定通过
// 画布按容器实际宽度渲染(响应式),内部判定坐标统一用画布像素
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import bgUrl from '../../assets/products/yk-6a_banner.png'

const emit = defineEmits(['verified'])
const isDev = import.meta.env.DEV

const CW = 320 // 逻辑画布宽(判定坐标系)
const CH = 130
const PIECE = 44
const TOLERANCE = 6

const wrap = ref(null)
const bgCanvas = ref(null)
const pieceCanvas = ref(null)
const handle = ref(null)

const state = ref('idle') // idle | dragging | done
const pieceX = ref(0)
const handleX = ref(0)

const targetX = ref(0)
// 缺口垂直位置(拼块跟随),draw() 时随机
const notchY = ref(0)
let startX = 0
let img = null
let scale = 1

// 逻辑坐标 → 页面像素(容器实际宽 / 逻辑宽)
const pieceLeft = computed(() => `${pieceX.value * scale}px`)
const handleLeft = computed(() => `${handleX.value * scale}px`)

function draw() {
  const box = wrap.value?.querySelector('.slide-verify__canvas-wrap')
  if (!bgCanvas.value || !pieceCanvas.value || !img || !box) return
  scale = box.clientWidth / CW
  const bw = Math.round(CW * scale)
  const bh = Math.round(CH * scale)
  const bg = bgCanvas.value
  const pc = pieceCanvas.value
  bg.width = bw
  bg.height = bh
  pc.width = Math.round(PIECE * scale)
  pc.height = bh
  const bctx = bg.getContext('2d')
  const pctx = pc.getContext('2d')
  bctx.scale(scale, scale)
  pctx.scale(scale, scale)

  // 等比裁剪铺满
  const s = Math.max(CW / img.width, CH / img.height)
  const sw = CW / s
  const sh = CH / s
  bctx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, 0, 0, CW, CH)

  // 缺口位置(留出滑块初始区与右侧余量)
  targetX.value = 120 + Math.floor(Math.random() * (CW - PIECE - 140))
  // 缺口垂直位置随机(上下各留 12px 安全边距)
  notchY.value = 12 + Math.floor(Math.random() * (CH - PIECE - 24))
  bctx.save()
  roundRect(bctx, targetX.value, notchY.value, PIECE, PIECE, 6)
  bctx.fillStyle = 'rgba(20,40,30,0.45)'
  bctx.fill()
  bctx.strokeStyle = 'rgba(255,255,255,0.85)'
  bctx.lineWidth = 2
  bctx.stroke()
  bctx.restore()

  // 拼图块(与缺口同 y 取图)
  pctx.clearRect(0, 0, PIECE, CH)
  pctx.save()
  roundRect(pctx, 0, notchY.value, PIECE, PIECE, 6)
  pctx.clip()
  pctx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, -targetX.value, 0, CW, CH)
  pctx.restore()
  pctx.strokeStyle = 'rgba(255,255,255,0.9)'
  pctx.lineWidth = 2
  roundRect(pctx, 1, notchY.value + 1, PIECE - 2, PIECE - 2, 6)
  pctx.stroke()
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function reset() {
  state.value = 'idle'
  pieceX.value = 0
  handleX.value = 0
  draw()
}

function onDown(e) {
  if (state.value === 'done') return
  state.value = 'dragging'
  startX = e.clientX - pieceX.value * scale
  handle.value.setPointerCapture(e.pointerId)
  handle.value.addEventListener('pointermove', onMove)
  handle.value.addEventListener('pointerup', onUp, { once: true })
}

function onMove(e) {
  if (state.value !== 'dragging') return
  const max = CW - PIECE
  const x = Math.min(max, Math.max(0, (e.clientX - startX) / scale))
  pieceX.value = x
  handleX.value = x
}

function onUp() {
  handle.value?.removeEventListener('pointermove', onMove)
  if (state.value !== 'dragging') return
  if (Math.abs(pieceX.value - targetX.value) <= TOLERANCE) {
    state.value = 'done'
    emit('verified')
  } else {
    // 未对准:回弹重置(拼块重新随机)
    setTimeout(reset, 250)
  }
}

onMounted(() => {
  img = new Image()
  img.onload = draw
  img.src = bgUrl
  window.addEventListener('resize', onResize)
})

function onResize() {
  if (state.value !== 'done') draw()
}

onBeforeUnmount(() => {
  handle.value?.removeEventListener('pointermove', onMove)
  window.removeEventListener('resize', onResize)
})

defineExpose({ reset })
</script>

<style scoped>
.slide-verify {
  width: 100%;
  user-select: none;
}

.slide-verify__canvas-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 320 / 130;
  border-radius: 6px;
  overflow: hidden;
  background: #eef2ef;
}

.slide-verify__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.slide-verify__piece {
  position: absolute;
  top: 0;
  height: 100%;
  cursor: grab;
  will-change: left;
}

.slide-verify__handle {
  cursor: grab;
}

.slide-verify__piece:active,
.slide-verify__handle:active {
  cursor: grabbing;
}

.slide-verify__ok {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 166, 81, 0.35);
  color: #fff;
  font-weight: 600;
}

.slide-verify__track {
  position: relative;
  margin-top: 8px;
  height: 38px;
  border-radius: 19px;
  background: #eef2ef;
  overflow: hidden;
}

.slide-verify__hint {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #8a9490;
}

.slide-verify__hint--ok {
  color: #00a651;
}

.slide-verify__handle {
  position: absolute;
  top: 0;
  width: 44px;
  height: 38px;
  border-radius: 19px;
  background: #00a651;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  touch-action: none;
}

.slide-verify__handle--done {
  background: #27ae60;
}

.slide-verify__arrows {
  letter-spacing: -2px;
  font-weight: 700;
}
</style>
