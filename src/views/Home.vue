<template>
  <div class="home">
    <!-- Hero 轮播 -->
    <HeroCarousel />

    <!-- 公司简介 + 数据 -->
    <section class="section">
      <div class="container">
        <div class="intro" data-reveal>
          <div class="intro__text">
            <span class="section-tag">{{ $t('home.intro.tag') }}</span>
            <h2 class="section-title">{{ $t('home.intro.title') }}</h2>
            <p class="intro__desc">{{ $t('home.intro.desc') }}</p>
            <el-button type="primary" text @click="$router.push('/about')">
              {{ $t('common.learnMore') }} →
            </el-button>
          </div>
          <div class="intro__stats">
            <div v-for="stat in stats" :key="stat.label" class="intro__stat">
              <strong>{{ stat.value }}</strong>
              <span>{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心业务 -->
    <section class="section section--soft">
      <div class="container">
        <div class="section-head" data-reveal>
          <span class="section-tag">{{ $t('home.services.tag') }}</span>
          <h2 class="section-title">{{ $t('home.services.title') }}</h2>
        </div>
        <div class="cards">
          <div v-for="(s, i) in services" :key="s.id" class="card" data-reveal :data-reveal-delay="(i % 3) + 1">
            <el-icon :size="30" color="var(--c-primary)"><component :is="icons[s.icon]" /></el-icon>
            <h3>{{ pick(s.name, locale) }}</h3>
            <p>{{ pick(s.desc, locale) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心优势(正泰风:左文右图+电路连线+大数字) -->
    <section class="section">
      <div class="container adv">
        <div class="adv__left" data-reveal>
          <span class="section-tag">{{ $t('home.advantages.tag') }}</span>
          <h2 class="adv__title">{{ $t('home.advantages.title') }}</h2>

          <svg class="adv__wire" viewBox="0 0 320 64" fill="none" aria-hidden="true">
            <path d="M4 0 V28 Q4 36 12 36 H120" stroke="#00a651" stroke-width="2.5" />
            <path d="M120 36 H300" stroke="#57e39a" stroke-width="2" opacity="0.7" />
            <circle cx="302" cy="36" r="4" fill="#00a651" />
            <circle cx="4" cy="2" r="3.5" fill="#57e39a" />
          </svg>

          <p class="adv__slogan">{{ $t('home.advantages.slogan') }}</p>
          <p class="adv__lead">{{ $t('home.advantages.lead') }}</p>

          <div class="adv__stats" data-reveal>
            <div class="adv__stat">
              <strong class="count">{{ $t('home.advantages.stat1Value') }}</strong>
              <span>{{ $t('home.advantages.stat1Label') }}</span>
            </div>
            <div class="adv__stat">
              <strong class="count">{{ $t('home.advantages.stat2Value') }}</strong>
              <span>{{ $t('home.advantages.stat2Label') }}</span>
            </div>
          </div>
        </div>

        <div class="adv__fig" data-reveal data-reveal-delay="1">
          <img :src="heroCity" alt="YINKAI smart city" />
        </div>
      </div>

      <div class="container">
        <div class="adv-list">
          <div v-for="(key, i) in ['a1', 'a2', 'a3', 'a4']" :key="key" class="adv-list__item" data-reveal :data-reveal-delay="(i % 3) + 1">
            <span class="adv-list__num">0{{ i + 1 }}</span>
            <h3>{{ $t(`home.advantages.${key}.title`) }}</h3>
            <p>{{ $t(`home.advantages.${key}.desc`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 服务与合作伙伴 -->
    <section class="section section--soft">
      <div class="container partners">
        <div class="partners__left" data-reveal>
          <span class="section-tag">{{ $t('home.partners.tag') }}</span>
          <h2 class="partners__title">{{ $t('home.partners.title') }}</h2>

          <svg class="partners__wire" viewBox="0 0 320 64" fill="none" aria-hidden="true">
            <path d="M4 0 V28 Q4 36 12 36 H120" stroke="#00a651" stroke-width="2.5" />
            <path d="M120 36 H300" stroke="#57e39a" stroke-width="2" opacity="0.7" />
            <circle cx="302" cy="36" r="4" fill="#00a651" />
            <circle cx="4" cy="2" r="3.5" fill="#57e39a" />
          </svg>

          <p class="partners__desc">{{ $t('home.partners.desc') }}</p>
        </div>

        <div class="partners__wall" data-reveal data-reveal-delay="1">
          <div v-for="p in partners" :key="p.id" class="partners__cell">
            <img :src="p.image" :alt="pick(p.name, locale)" loading="lazy" />
          </div>
        </div>
      </div>

    </section>

    <!-- CTA -->
    <section class="cta">
      <div class="container cta__inner">
        <div class="cta__text">
          <h2>{{ $t('home.cta.title') }}</h2>
          <p>{{ $t('home.cta.desc') }}</p>
          <el-button type="primary" size="large" round @click="$router.push('/contact')">
            {{ $t('home.cta.btn') }}
          </el-button>
        </div>

        <div class="cta__visual" aria-hidden="true">
          <span class="cta__block cta__block--big"></span>
          <span class="cta__block cta__block--small"></span>
          <svg class="unicorn" viewBox="0 0 260 320">
            <defs>
              <!-- 3D 塑体质感:径向高光渐变 -->
              <radialGradient id="uni-body" cx="0.38" cy="0.28" r="0.95">
                <stop offset="0" stop-color="#ffffff" />
                <stop offset="0.62" stop-color="#f4faf6" />
                <stop offset="1" stop-color="#d5e7dd" />
              </radialGradient>
              <radialGradient id="uni-head" cx="0.36" cy="0.3" r="0.95">
                <stop offset="0" stop-color="#ffffff" />
                <stop offset="0.6" stop-color="#f6fbf8" />
                <stop offset="1" stop-color="#d5e7dd" />
              </radialGradient>
              <linearGradient id="uni-horn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#4cc088" />
                <stop offset="1" stop-color="#00a651" />
              </linearGradient>
              <linearGradient id="uni-leg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#ffffff" />
                <stop offset="1" stop-color="#dcebe2" />
              </linearGradient>
              <radialGradient id="uni-shadow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stop-color="rgba(0,90,50,0.28)" />
                <stop offset="1" stop-color="rgba(0,90,50,0)" />
              </radialGradient>
            </defs>

            <!-- 地面软阴影 -->
            <ellipse cx="130" cy="302" rx="78" ry="14" fill="url(#uni-shadow)" />

            <g class="unicorn__float">
              <!-- 腿 -->
              <rect x="93" y="230" width="28" height="66" rx="14" fill="url(#uni-leg)" />
              <rect x="139" y="230" width="28" height="66" rx="14" fill="url(#uni-leg)" />
              <!-- 身体 -->
              <ellipse cx="130" cy="196" rx="62" ry="66" fill="url(#uni-body)" />
              <!-- 小翅膀 -->
              <path d="M66 158 q-26 -18 -30 -44 q22 4 34 24 z" fill="#b3e7cd" />
              <path d="M194 158 q26 -18 30 -44 q-22 4 -34 24 z" fill="#b3e7cd" />

              <!-- 左臂(下垂,手指分明) -->
              <g class="unicorn__arm">
                <rect x="58" y="168" width="22" height="52" rx="11" fill="url(#uni-body)" transform="rotate(8 69 168)" />
                <g class="unicorn__hand">
                  <ellipse cx="66" cy="228" rx="12" ry="11" fill="#ffffff" />
                  <rect x="55" y="228" width="7" height="14" rx="3.5" fill="#ffffff" />
                  <rect x="64" y="230" width="7" height="16" rx="3.5" fill="#ffffff" />
                  <rect x="73" y="228" width="7" height="13" rx="3.5" fill="#ffffff" />
                </g>
              </g>

              <!-- 右臂(挥手) -->
              <g class="unicorn__wave">
                <rect x="180" y="168" width="22" height="52" rx="11" fill="url(#uni-body)" transform="rotate(-24 191 168)" />
                <g class="unicorn__hand">
                  <ellipse cx="212" cy="128" rx="12" ry="11" fill="#ffffff" />
                  <rect x="198" y="116" width="7" height="14" rx="3.5" fill="#ffffff" transform="rotate(-30 201 123)" />
                  <rect x="210" y="112" width="7" height="16" rx="3.5" fill="#ffffff" />
                  <rect x="220" y="118" width="7" height="14" rx="3.5" fill="#ffffff" transform="rotate(30 223 125)" />
                </g>
              </g>

              <!-- 头部(拟人大头) -->
              <g>
                <!-- 马耳(长而尖,位于独角两侧) -->
                <path d="M92 34 Q84 6 62 10 Q78 20 82 42 Z" fill="#ffffff" />
                <path d="M87 34 Q82 16 70 14 Q80 22 82 38 Z" fill="#7dd8a8" />
                <path d="M168 34 Q176 6 198 10 Q182 20 178 42 Z" fill="#ffffff" />
                <path d="M173 34 Q178 16 190 14 Q180 22 178 38 Z" fill="#7dd8a8" />
                <!-- 头 -->
                <circle cx="130" cy="96" r="62" fill="url(#uni-head)" />
                <!-- 独角(加高加宽,条纹) -->
                <path d="M130 -4 l17 52 h-34 z" fill="url(#uni-horn)" />
                <path d="M118 34 l24 -6 M121 20 l18 -4 M124 8 l12 -3" stroke="#ccefe0" stroke-width="3.5" stroke-linecap="round" />
                <!-- 前额鬃毛刘海(独角下) -->
                <path d="M112 46 q-22 8 -26 34 q14 -16 28 -16 q-8 10 -6 22 q10 -16 22 -18 q-4 12 0 20 q8 -14 22 -16 q16 -6 24 -22 q-22 10 -30 4 q-16 -12 -34 -8 z" fill="#00a651" />
                <!-- 侧鬃毛(垂到肩) -->
                <path d="M74 84 q-14 26 -8 56 q10 -30 20 -40 z" fill="#35bd7c" />
                <path d="M186 84 q14 26 8 56 q-10 -30 -20 -40 z" fill="#35bd7c" />
                <!-- 口鼻(马吻,小巧) -->
                <ellipse cx="130" cy="130" rx="24" ry="15" fill="#f0f8f3" />
                <path d="M116 134 q14 10 28 0" stroke="#9fb8aa" stroke-width="3" fill="none" stroke-linecap="round" />
                <circle cx="121" cy="126" r="2.4" fill="#9fb8aa" />
                <circle cx="139" cy="126" r="2.4" fill="#9fb8aa" />
                <!-- 眼睛(眨眼) -->
                <g class="unicorn__eye">
                  <circle cx="104" cy="88" r="7.5" fill="#1f2d26" />
                  <circle cx="106.5" cy="85.5" r="2.6" fill="#ffffff" />
                  <circle cx="101.5" cy="90.5" r="1.3" fill="#ffffff" opacity="0.85" />
                </g>
                <g class="unicorn__eye">
                  <circle cx="156" cy="88" r="7.5" fill="#1f2d26" />
                  <circle cx="158.5" cy="85.5" r="2.6" fill="#ffffff" />
                  <circle cx="153.5" cy="90.5" r="1.3" fill="#ffffff" opacity="0.85" />
                </g>
                <!-- 腮红 -->
                <ellipse cx="86" cy="106" rx="9" ry="5.5" fill="#b3e7cd" opacity="0.9" />
                <ellipse cx="174" cy="106" rx="9" ry="5.5" fill="#b3e7cd" opacity="0.9" />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  SetUp, View, Search, OfficeBuilding,
} from '@element-plus/icons-vue'
import { services, partners } from '../data'
import { pick } from '../data/lang'
import HeroCarousel from '../components/HeroCarousel.vue'
import heroCity from '../assets/hero-city.svg'

const { locale, t } = useI18n()

const icons = { SetUp, View, Search, OfficeBuilding }

const stats = computed(() => [
  { value: '20+', label: t('home.intro.stat1') },
  { value: '150+', label: t('home.intro.stat2') },
  { value: '10000+', label: t('home.intro.stat3') },
  { value: '±0.1', label: t('home.intro.stat4') },
])

/* ---------- 滚动入场 + 大数字计数 + 视差(尊重系统减动效) ---------- */
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

let revealObserver = null
let scrollRaf = null

// 解析文本中的数字(保留 ±/单位前后缀与小数位),缓动滚动到目标值
// 页面不可见/定时器被节流时直接跳终值,保证任何时刻数值正确;可重入(el._counting 防重)
const snapCount = (el) => {
  const finalText = el.dataset.final ?? el.textContent
  el.dataset.final = finalText
  const m = finalText.match(/^([^\d]*)([\d.]+)(.*)$/)
  if (m) el.textContent = finalText
  clearInterval(el._countTimer)
  el._counting = false
}
const animateCount = (el) => {
  // 可重入:清掉上一轮(可能被后台冻结的)计数,重新完整播放
  clearInterval(el._countTimer)
  document.removeEventListener('visibilitychange', el._onVis ?? (() => {}))
  el._counting = false
  const finalText = el.dataset.final ?? el.textContent
  el.dataset.final = finalText
  const m = finalText.match(/^([^\d]*)([\d.]+)(.*)$/)
  if (!m) { el._counting = false; return }
  const finish = () => {
    clearInterval(el._countTimer)
    document.removeEventListener('visibilitychange', el._onVis)
    el.textContent = finalText
    el._counting = false
  }
  const onVis = () => { if (document.hidden) finish() }
  el._onVis = onVis
  if (document.hidden || prefersReducedMotion()) { finish(); return }
  const decimals = (m[2].split('.')[1] || '').length
  const target = parseFloat(m[2])
  const prefix = m[1]
  const suffix = m[3]
  const duration = 1200
  const start = performance.now()
  const timer = setInterval(() => {
    if (document.hidden) { finish(); return }
    const k = Math.min(1, (performance.now() - start) / duration)
    const eased = 1 - Math.pow(1 - k, 3)
    el.textContent = prefix + (target * eased).toFixed(decimals) + suffix
    if (k >= 1) finish()
  }, 16)
  document.addEventListener('visibilitychange', onVis)
  el._countTimer = timer
  el._counting = true
}

const onScroll = () => {
  if (scrollRaf) return
  scrollRaf = requestAnimationFrame(() => {
    scrollRaf = null
    const fig = document.querySelector('.adv__fig')
    if (!fig) return
    const r = fig.getBoundingClientRect()
    const vh = window.innerHeight
    if (r.bottom < 0 || r.top > vh) return
    const progress = (vh - r.top) / (vh + r.height)
    fig.querySelector('img').style.transform = `translateY(${((progress - 0.5) * 30).toFixed(1)}px)`
  })
}

onMounted(() => {
  const els = document.querySelectorAll('[data-reveal]')
  if (prefersReducedMotion()) {
    els.forEach((el) => el.classList.add('revealed'))
    return
  }
  // 每次进入视口都重播:进入→加 .revealed 并跑计数;离开→复位待重播
  revealObserver = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const el = e.target
      if (e.isIntersecting) {
        el.classList.add('revealed')
        el.querySelectorAll('.count').forEach(animateCount)
        if (el.classList.contains('count')) animateCount(el)
      } else {
        el.classList.remove('revealed')
        el.querySelectorAll('.count').forEach(snapCount)
        if (el.classList.contains('count')) snapCount(el)
      }
    }
  }, { threshold: 0.18 })
  els.forEach((el) => revealObserver.observe(el))
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()
  window.removeEventListener('scroll', onScroll)
  if (scrollRaf) cancelAnimationFrame(scrollRaf)
})
</script>

<style scoped>
.intro {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 48px;
  align-items: center;
}

.intro__desc {
  color: var(--c-text-secondary);
  margin-bottom: 16px;
}

.intro__stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.intro__stat {
  background: var(--c-bg-soft);
  border-radius: var(--radius);
  padding: 24px 18px;
  text-align: center;
}

.intro__stat strong {
  display: block;
  font-size: clamp(22px, 2.4vw, 30px);
  color: var(--c-primary);
}

.intro__stat span {
  font-size: 13px;
  color: var(--c-text-secondary);
}

.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
}

.cards--4 {
  grid-template-columns: repeat(4, 1fr);
}

.card {
  background: #fff;
  border: 1px solid var(--c-border);
  border-radius: var(--radius);
  padding: 28px 22px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.card h3 {
  font-size: 17px;
  margin: 14px 0 8px;
}

.card p {
  font-size: 14px;
  color: var(--c-text-secondary);
}

.card__num {
  font-size: 26px;
  font-weight: 800;
  color: var(--c-primary-light);
  -webkit-text-stroke: 1px var(--c-primary);
}

/* ---------- 核心优势(正泰风) ---------- */
.adv {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 56px;
  align-items: center;
}

.adv__title {
  font-size: clamp(26px, 2.6vw, 36px);
  color: var(--c-text);
  margin: 14px 0 6px;
}

.adv__wire {
  width: 280px;
  height: 56px;
  margin: 8px 0 18px;
}

.adv__slogan {
  font-size: clamp(17px, 1.5vw, 20px);
  font-weight: 700;
  color: var(--c-primary);
  margin-bottom: 10px;
}

.adv__lead {
  color: var(--c-text-secondary);
  line-height: 1.9;
  margin-bottom: 34px;
  max-width: 420px;
}

.adv__stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 220px));
  gap: 28px;
}

.adv__stat {
  border-top: 1px solid var(--c-border);
  padding-top: 14px;
}

.adv__stat strong {
  display: block;
  font-size: clamp(30px, 3vw, 44px);
  font-weight: 800;
  color: var(--c-primary);
  line-height: 1.2;
}

.adv__stat span {
  font-size: 0.875rem;
  color: var(--c-text-secondary);
}

.adv__fig {
  min-width: 0;
}

.adv__fig img {
  width: 100%;
  display: block;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  will-change: transform;
}

/* 电路连线:进视口描边绘制 + 端点脉冲 */
@media (prefers-reduced-motion: no-preference) {
  .adv__wire path,
  .partners__wire path {
    stroke-dasharray: 340;
    stroke-dashoffset: 340;
  }

  .adv__left.revealed .adv__wire path,
  .partners__left.revealed .partners__wire path {
    animation: wire-draw 1.1s ease 0.3s forwards;
  }

  .adv__wire circle,
  .partners__wire circle {
    animation: dot-pulse 2.6s ease-in-out 1.5s infinite;
  }

  @keyframes wire-draw {
    to { stroke-dashoffset: 0; }
  }

  @keyframes dot-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
}

/* 四条优势:一行四列轻量排布 */
.adv-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
  margin-top: clamp(40px, 5vw, 64px);
}

.adv-list__item {
  border-top: 2px solid var(--c-primary-light);
  padding-top: 16px;
}

.adv-list__num {
  font-size: 26px;
  font-weight: 800;
  color: var(--c-primary);
  opacity: 0.45;
}

.adv-list__item h3 {
  font-size: 1rem;
  margin: 8px 0;
}

.adv-list__item p {
  font-size: 0.875rem;
  color: var(--c-text-secondary);
  line-height: 1.75;
}

/* ---------- 服务与合作伙伴 ---------- */
.partners {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 56px;
  align-items: center;
}

.partners__title {
  font-size: clamp(26px, 2.6vw, 36px);
  color: var(--c-text);
  margin: 14px 0 6px;
}

.partners__wire {
  width: 280px;
  height: 56px;
  margin: 8px 0 18px;
}

.partners__desc {
  color: var(--c-text-secondary);
  line-height: 1.9;
  max-width: 420px;
}

.partners__wall {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  min-width: 0;
}

.partners__cell {
  background: #fff;
  border: 1px solid var(--c-border);
  border-radius: var(--radius);
  aspect-ratio: 5 / 3;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  min-width: 0;
}

.partners__cell:hover {
  border-color: var(--c-primary);
  box-shadow: var(--shadow);
  transform: translateY(-3px);
}

.partners__cell img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
}

.center {
  text-align: center;
}

.center {
  text-align: center;
}

.cta {
  background: var(--c-bg-soft);
  padding: clamp(48px, 6vw, 80px) 0;
  overflow: hidden;
}

.cta__inner {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: clamp(28px, 4vw, 64px);
  align-items: center;
}

.cta__text h2 {
  font-size: clamp(24px, 2.6vw, 34px);
  color: var(--c-text);
  margin-bottom: 14px;
}

.cta__text p {
  max-width: 480px;
  margin-bottom: 26px;
  color: var(--c-text-secondary);
  line-height: 1.9;
}

/* 独角兽动画区:品牌绿圆角色块错位衬底 */
.cta__visual {
  position: relative;
  min-width: 0;
  display: flex;
  justify-content: center;
}

.cta__block {
  position: absolute;
  border-radius: 32px;
}

.cta__block--big {
  width: 78%;
  height: 82%;
  right: 0;
  bottom: 0;
  background: var(--c-primary-light);
}

.cta__block--small {
  width: 46%;
  height: 46%;
  left: 4%;
  bottom: -12px;
  background: #ccefe0;
}

.unicorn {
  position: relative;
  width: clamp(200px, 22vw, 300px);
  height: auto;
  filter: drop-shadow(0 14px 22px rgba(0, 166, 81, 0.16));
}

.unicorn__float {
  animation: unicorn-float 3.2s ease-in-out infinite;
  transform-box: fill-box;
  transform-origin: center;
}

.unicorn__wave {
  transform-box: fill-box;
  transform-origin: 30% 90%;
  animation: unicorn-wave 2.2s ease-in-out infinite;
}

.unicorn__eye {
  transform-box: fill-box;
  transform-origin: center;
  animation: unicorn-blink 4.2s ease-in-out infinite;
}

@media (prefers-reduced-motion: no-preference) {
  @keyframes unicorn-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @keyframes unicorn-wave {
    0%, 100% { transform: rotate(0deg); }
    50% { transform: rotate(14deg); }
  }

  @keyframes unicorn-blink {
    0%, 92%, 100% { transform: scaleY(1); }
    95% { transform: scaleY(0.08); }
  }
}

@media (max-width: 1024px) {
  .cards,
  .cards--4 {
    grid-template-columns: repeat(2, 1fr);
  }

  .partners {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .cta__inner {
    grid-template-columns: 1fr;
    text-align: left;
  }

  .cta__visual {
    order: -1;
  }
}

@media (max-width: 768px) {
  .intro {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .partners {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .partners__wall {
    grid-template-columns: repeat(2, 1fr);
  }

  .partners__wire {
    width: 200px;
  }

  .adv {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .adv__wire {
    width: 200px;
  }

  .adv__stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .adv-list {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .cards,
  .cards--4 {
    grid-template-columns: 1fr;
  }
}
</style>
