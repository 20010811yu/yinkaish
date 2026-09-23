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
      <ellipse class="panel-shadow" cx="165" cy="213" rx="105" ry="6" />
      <ellipse class="panel-shadow" cx="108" cy="213" rx="52" ry="5" />
      <!-- 光伏板 B(后排小板):左低右高倾斜+前后腿支架 -->
      <g class="panel panel--b">
        <path class="panel__leg" d="M60 199 V212 M152 156 V212 M152 190 L108 168" />
        <path class="panel__edge" d="M52 196 L140 158 L140 164 L52 202 Z M52 196 L78 182 L78 188 L52 202 Z" />
        <path class="panel__top" d="M52 196 L140 158 L166 144 L78 182 Z" />
        <path class="panel__cell" d="M81 184 L107 170 M110 171 L136 157 M65 189 L153 151" />
        <path class="panel__shine" d="M52 196 L140 158 L162 164 L74 202 Z" />
      </g>
      <!-- 光伏板 A(前排大板):左低右高明显倾角,双立柱+导轨+斜撑(真实倾斜支架) -->
      <g class="panel panel--a">
        <path class="panel__leg" d="M100 173 V212 M228 127 V212 M100 198 L228 136 M92 178 L248 120" />
        <path class="panel__edge" d="M64 178 L232 118 L232 126 L64 186 Z M64 178 L108 152 L108 160 L64 186 Z" />
        <path class="panel__top" d="M64 178 L232 118 L276 92 L108 152 Z" />
        <path class="panel__cell" d="M106 163 L150 137 M148 148 L192 122 M190 133 L234 107 M86 165 L254 105" />
        <path class="panel__shine" d="M64 178 L232 118 L258 102 L90 162 Z" />
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
