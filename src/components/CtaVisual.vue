<template>
  <div ref="rootRef" class="cta-visual" aria-hidden="true">
    <!-- 背景层:两个错位圆角色块 -->
    <span class="cta-visual__block cta-visual__block--big"></span>
    <span class="cta-visual__block cta-visual__block--small"></span>
    <!-- 顶层:光伏板+太阳线条动画,横跨两个色块 -->
    <svg class="cta-visual__art" viewBox="0 0 360 220" fill="none">
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
      <!-- 光伏板 A:骑在大色块上缘 -->
      <g class="panel panel--a">
        <path class="panel__frame" d="M118 148 L206 108 L292 132 L204 172 Z" />
        <path class="panel__cell" d="M147 138 L235 98 M153 148 L241 108 M161 161 L249 121 M153 140 L165 153 M204 118 L216 131 M178 129 L190 142 M229 109 L241 122" />
        <path class="panel__leg" d="M180 166 L172 192 M238 142 L246 168" />
        <path class="panel__shine" d="M118 148 L206 108 L232 115 L144 155 Z" />
      </g>
      <!-- 光伏板 B:骑在色块左下交界 -->
      <g class="panel panel--b">
        <path class="panel__frame" d="M40 182 L104 156 L164 172 L100 198 Z" />
        <path class="panel__cell" d="M62 173 L126 147 M67 182 L131 156 M73 192 L137 166 M67 175 L78 187 M104 161 L115 173 M90 168 L101 180" />
        <path class="panel__shine" d="M40 182 L104 156 L124 161 L60 187 Z" />
      </g>
      <!-- 地平线:贯通两块 -->
      <path class="ground" d="M24 212 H336" />
    </svg>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

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
  width: 94%;
  max-width: 560px;
  height: 100%;
  margin: 0 auto;
  left: 0;
  right: 0;
}

.sun__core {
  fill: var(--c-primary);
}

.sun__ray,
.panel__frame,
.panel__cell,
.panel__leg,
.ground {
  stroke: var(--c-primary-dark);
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.panel__cell,
.panel__leg {
  stroke-width: 1.6;
  stroke-opacity: 0.75;
}

.panel__shine {
  fill: rgb(255 255 255 / 35%);
  stroke: none;
}

@media (prefers-reduced-motion: no-preference) {
  /* 进场描边绘制 */
  .panel__frame,
  .panel__cell,
  .panel__leg,
  .ground {
    stroke-dasharray: 900;
    stroke-dashoffset: 900;
  }

  .revealed .panel__frame,
  .revealed .panel__cell,
  .revealed .panel__leg,
  .revealed .ground {
    animation: cta-draw 1.1s ease forwards;
  }

  .revealed .panel__cell { animation-delay: 0.35s; }
  .revealed .panel__leg { animation-delay: 0.6s; }
  .revealed .ground { animation-delay: 0.75s; }

  @keyframes cta-draw {
    to { stroke-dashoffset: 0; }
  }

  /* 阳光呼吸 */
  .sun__ray {
    animation: cta-ray 3s ease-in-out infinite;
  }

  .revealed .sun__core {
    animation: cta-core 3s ease-in-out infinite;
    transform-box: fill-box;
    transform-origin: center;
  }

  @keyframes cta-ray {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  @keyframes cta-core {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(0.92); }
  }

  /* 板面光泽扫过 */
  .panel__shine {
    opacity: 0;
    animation: cta-shine 2.8s ease-in-out 1.4s infinite;
  }

  @keyframes cta-shine {
    0%, 55% { opacity: 0; }
    25% { opacity: 1; }
    100% { opacity: 0; }
  }
}

@media (prefers-reduced-motion: reduce) {
  .panel__frame,
  .panel__cell,
  .panel__leg,
  .ground {
    stroke-dasharray: none;
  }
}
</style>
