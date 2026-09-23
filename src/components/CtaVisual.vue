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

  /* 面板蓝深随太阳呼吸:太阳最大最亮时蓝最深 */
  .revealed .panel__tint {
    animation: cta-tint 3s ease-in-out infinite;
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
}
</style>
