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
      <!-- 光伏面板:正对屏幕、顶部向后倾(下宽上窄梯形),正面支架 -->
      <g class="panel">
        <path class="panel__leg" d="M130 176 V212 M260 176 V212 M130 196 H260" />
        <path class="panel__edge" d="M100 170 L290 170 L290 176 L100 176 Z" />
        <path class="panel__top" d="M100 170 L120 95 L270 95 L290 170 Z" />
        <path class="panel__cell" d="M158 95 L148 170 M195 95 L195 170 M232 95 L242 170 M107 145 L283 145 M113 121 L277 121" />
        <path class="panel__shine" d="M100 170 L150 95 L190 95 L140 170 Z" />
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
.panel__leg,
.ground {
  stroke: var(--c-primary-dark);
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* 电池片顶面:深蓝渐变+绿描边 */
.panel__top {
  fill: url(#pvCell);
  stroke: var(--c-primary-dark);
  stroke-width: 2;
  stroke-linejoin: round;
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
  stroke-opacity: 0.75;
}

.panel-shadow {
  fill: rgb(14 77 47 / 12%);
}

.panel__shine {
  fill: rgb(255 255 255 / 30%);
  stroke: none;
}

@media (prefers-reduced-motion: no-preference) {
  /* 进场描边绘制 + 顶面/侧边淡入 */
  .panel__top,
  .panel__edge,
  .panel__leg,
  .ground {
    stroke-dasharray: 900;
    stroke-dashoffset: 900;
  }

  .panel__top,
  .panel__edge,
  .panel__cell {
    opacity: 0;
    transition: opacity 0.6s ease 0.5s;
  }

  .revealed .panel__top,
  .revealed .panel__edge,
  .revealed .panel__cell {
    opacity: 1;
  }

  .revealed .panel__top,
  .revealed .panel__edge,
  .revealed .panel__leg,
  .revealed .ground {
    animation: cta-draw 1.1s ease forwards;
  }

  .revealed .panel__cell { animation: none; }
  .revealed .panel__leg { animation-delay: 0.6s; }
  .revealed .ground { animation-delay: 0.75s; }

  @keyframes cta-draw {
    to { stroke-dashoffset: 0; }
  }

  /* 阳光呼吸(明显胀缩+明暗) */
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
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.12; transform: scale(0.88); }
  }

  @keyframes cta-core {
    0%, 100% { transform: scale(1); filter: brightness(1); }
    50% { transform: scale(0.78); filter: brightness(1.3); }
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
  .panel__top,
  .panel__edge,
  .panel__leg,
  .ground {
    stroke-dasharray: none;
  }
}
</style>
