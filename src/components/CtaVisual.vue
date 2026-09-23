<template>
  <div ref="rootRef" class="cta-visual" aria-hidden="true">
    <!-- 背景层:两个错位圆角色块 -->
    <span class="cta-visual__block cta-visual__block--big"></span>
    <span class="cta-visual__block cta-visual__block--small"></span>
    <!-- 顶层:光伏板+太阳线条动画,横跨两个色块 -->
    <svg class="cta-visual__art" viewBox="0 0 360 220" fill="none">
      <defs>
        <!-- 电池片深蓝渐变(真实单晶硅板色) -->
        <linearGradient id="pvCell" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#173d63" />
          <stop offset="0.55" stop-color="#1f5a8c" />
          <stop offset="1" stop-color="#2a6fa5" />
        </linearGradient>
        <!-- 铝合金边框侧边 -->
        <linearGradient id="pvEdge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#f2f7f4" />
          <stop offset="1" stop-color="#b9cfc2" />
        </linearGradient>
      </defs>
      <!-- 太阳:中心圆+8条射线 -->
      <g class="sun">
        <circle cx="66" cy="52" r="17" class="sun__core" />
        <g class="sun__rays">
          <line v-for="r in 8" :key="r" class="sun__ray"
            :x1="66 + 25 * Math.cos((r - 1) * Math.PI / 4)"
            :y1="52 + 25 * Math.sin((r - 1) * Math.PI / 4)"
            :x2="66 + 33 * Math.cos((r - 1) * Math.PI / 4)"
            :y2="52 + 33 * Math.sin((r - 1) * Math.PI / 4)" />
        </g>
      </g>
      <!-- 地面投影 -->
      <ellipse class="panel-shadow" cx="195" cy="213" rx="105" ry="6" />
      <!-- 光伏面板:正对屏幕、顶部向后倾,贴近地面的短柱支架(参照真实电站) -->
      <g class="panel">
        <path class="panel__leg" d="M130 189 V213 M260 189 V213 M130 203 H260" />
        <path class="panel__edge" d="M100 185 L290 185 L290 191 L100 191 Z" />
        <path class="panel__top" d="M100 185 L138 112 L270 112 L290 185 Z" />
        <!-- 12 块电池片:分隔线画完后按网格逐格填蓝 -->
        <path v-for="(d, i) in fillCells" :key="i" class="panel__fillcell" :d="d" :style="{ '--i': i }" />
        <!-- 呼吸染色层:随太阳胀缩同步加深/变浅 -->
        <path class="panel__tint" d="M100 185 L138 112 L270 112 L290 185 Z" />
        <path class="panel__cell" d="M171 112 L148 185 M204 112 L195 185 M237 112 L243 185 M113 161 L283 161 M125 137 L277 137" />
      </g>
      <!-- 地平线:贯通两块 -->
      <path class="ground" d="M24 212 H336" />
    </svg>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

// 12 块电池片多边形:按梯形边线线性插值切分(4 列 × 3 行),与分隔线完全对齐;填充顺序横向、自上而下
const fillCells = (() => {
  const cs = [0, 0.25, 0.5, 0.75, 1]
  const rs = [0, 1 / 3, 2 / 3, 1]
  const px = (c, r) => (1 - r) * (100 + 190 * c) + r * (138 + 132 * c)
  const py = (r) => 185 - 73 * r
  const cells = []
  for (let ri = rs.length - 2; ri >= 0; ri--) {
    for (let ci = 0; ci < 4; ci++) {
      const c0 = cs[ci]; const c1 = cs[ci + 1]
      const r0 = rs[ri]; const r1 = rs[ri + 1]
      cells.push(`M${px(c0, r0)} ${py(r0)} L${px(c1, r0)} ${py(r0)} L${px(c1, r1)} ${py(r1)} L${px(c0, r1)} ${py(r1)} Z`)
    }
  }
  return cells
})()

const rootRef = ref()
let observer = null

onMounted(() => {
  const root = rootRef.value
  if (!root) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('revealed')
    return
  }
  observer = new IntersectionObserver((entries) => {
    for (const e of entries) root.classList.toggle('revealed', e.isIntersecting)
  }, { threshold: 0.3 })
  observer.observe(root)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.cta-visual {
  position: relative;
  min-width: 0;
  min-height: clamp(200px, 22vw, 300px);
}

/* 背景层 */
.cta-visual__block {
  position: absolute;
  border-radius: 32px;
  z-index: 0;
}

.cta-visual__block--big {
  width: 78%;
  height: 82%;
  right: 0;
  bottom: 0;
  background: var(--c-primary-light);
}

.cta-visual__block--small {
  width: 46%;
  height: 46%;
  left: 4%;
  bottom: -12px;
  background: #ccefe0;
}

/* 顶层动画:横跨两个色块 */
.cta-visual__art {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  max-width: 660px;
  height: 100%;
  margin: 0 auto;
  left: 0;
  right: 0;
}

.sun__core {
  fill: var(--c-primary);
}

.sun__ray,
.panel__leg,
.ground {
  stroke: var(--c-primary-dark);
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* 面板外框:只描边,填色由 12 块电池片负责 */
.panel__top {
  fill: none;
  stroke: var(--c-primary-dark);
  stroke-width: 2;
  stroke-linejoin: round;
}

/* 电池片:深蓝渐变 */
.panel__fillcell {
  fill: url(#pvCell);
  stroke: none;
}

/* 铝合金板厚侧边 */
.panel__edge {
  fill: url(#pvEdge);
  stroke: var(--c-primary-dark);
  stroke-width: 1.5;
  stroke-linejoin: round;
}

/* 电池片分栅线:半透明白 */
.panel__cell {
  stroke: rgb(255 255 255 / 38%);
  stroke-width: 1.4;
  stroke-linecap: round;
}

.panel__leg {
  stroke-opacity: 0.9;
  stroke-width: 3; /* 立柱略粗,落地感更稳 */
}

.panel-shadow {
  fill: rgb(14 77 47 / 12%);
}

/* 呼吸染色层:叠在电池片上,随太阳胀缩改变面板蓝深 */
.panel__tint {
  fill: #0d2c4d;
  stroke: none;
  opacity: 0.3;
}

@media (prefers-reduced-motion: no-preference) {
  /* 分阶段绘制:①边框+支架同时描边 → ②电池分隔线 → ③逐格填色;离开视口瞬时复位,每次进入重播 */
  .panel__top,
  .panel__edge,
  .panel__leg,
  .ground,
  .panel__cell {
    stroke-dasharray: 900;
    stroke-dashoffset: 900;
  }

  /* 顶面周长≈482:从左下角一点起笔,一笔画完整圈边框 */
  .panel__top {
    stroke-dasharray: 482;
    stroke-dashoffset: 482;
  }

  /* ③逐格填色:每格延迟 calc(1.8s + 序号×0.07s);离开视口瞬时复位,保证每次滚入都重播 */
  .panel__fillcell {
    opacity: 0;
  }

  .revealed .panel__fillcell {
    opacity: 1;
    transition: opacity 0.35s ease calc(1.8s + var(--i) * 0.07s);
  }

  .panel__edge {
    opacity: 0;
    transition: opacity 0.6s ease 1.8s; /* 边框+分割线画完后板厚上色 */
  }

  .panel__cell,
  .panel__tint {
    opacity: 0;
  }

  .revealed .panel__edge,
  .revealed .panel__cell {
    opacity: 1;
  }

  /* ①边框与支架同时开始:0-0.9s 支架与电池面绘制时机一致 */
  .revealed .panel__top,
  .revealed .panel__leg,
  .revealed .ground {
    animation: cta-draw 0.9s ease forwards;
  }

  /* ②电池分隔线:0.9-1.7s 描边 */
  .revealed .panel__cell {
    animation: cta-draw 0.8s ease 0.9s forwards;
  }

  @keyframes cta-draw {
    to { stroke-dashoffset: 0; }
  }

  /* 太阳呼吸:50% 时最大最亮 */
  .sun__ray {
    animation: cta-ray 3s ease-in-out infinite;
    transform-origin: 66px 52px;
  }

  .revealed .sun__core {
    animation: cta-core 3s ease-in-out infinite;
    transform-box: fill-box;
    transform-origin: center;
  }

  @keyframes cta-ray {
    0%, 100% { opacity: 0.3; transform: scale(0.9); }
    50% { opacity: 1; transform: scale(1.08); }
  }

  @keyframes cta-core {
    0%, 100% { transform: scale(0.85); filter: brightness(1); }
    50% { transform: scale(1.1); filter: brightness(1.35); }
  }

  /* 面板蓝深随太阳呼吸:太阳最大最亮时蓝最深;延迟 3s(一个完整周期)等绘制完成后起步,相位与太阳对齐 */
  .revealed .panel__tint {
    animation: cta-tint 3s ease-in-out 3s infinite backwards;
  }

  @keyframes cta-tint {
    0%, 100% { opacity: 0; }
    50% { opacity: 0.68; }
  }
}

@media (prefers-reduced-motion: reduce) {
  .panel__top,
  .panel__edge,
  .panel__leg,
  .ground {
    stroke-dasharray: none;
  }

  .panel__fillcell {
    opacity: 1;
  }
}
</style>
