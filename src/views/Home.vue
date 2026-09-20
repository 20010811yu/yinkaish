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

      <div class="container" data-reveal>
        <div class="worldmap">
          <div class="worldmap__map" aria-hidden="true" :style="mapMaskStyle"></div>
          <div
            v-for="loc in mapLocations"
            :key="loc.key"
            class="worldmap__mark"
            :class="`worldmap__mark--${loc.key}`"
          >
            <span class="worldmap__dot"></span>
            <span class="worldmap__label">{{ $t(`home.partners.locations.${loc.key}`) }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <div class="container">
        <h2>{{ $t('home.cta.title') }}</h2>
        <p>{{ $t('home.cta.desc') }}</p>
        <el-button type="primary" size="large" round @click="$router.push('/contact')">
          {{ $t('home.cta.btn') }}
        </el-button>
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
import worldMap from '../assets/world-map.png'

const { locale, t } = useI18n()

const icons = { SetUp, View, Search, OfficeBuilding }

// 地图标记:公司服务覆盖点(上海总部 + 海外地区)
const mapLocations = [
  { key: 'shanghai' },
  { key: 'usa' },
  { key: 'egypt' },
  { key: 'india' },
  { key: 'malaysia' },
]

// 世界地图:SVG 作 CSS mask,填充品牌浅绿渐变
const mapMaskStyle = {
  WebkitMaskImage: `url(${worldMap})`,
  maskImage: `url(${worldMap})`,
}

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
  .adv__wire path {
    stroke-dasharray: 340;
    stroke-dashoffset: 340;
  }

  .adv__left.revealed .adv__wire path {
    animation: wire-draw 1.1s ease 0.3s forwards;
  }

  .adv__wire circle {
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

/* 世界地图:mask 填充品牌浅绿 + 区域脉冲标记 */
.worldmap {
  position: relative;
  margin-top: clamp(40px, 5vw, 64px);
  aspect-ratio: 1010 / 560;
  max-width: 980px;
  margin-left: auto;
  margin-right: auto;
}

.worldmap__map {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, #bfe9d2 0%, #7dd8a8 55%, #35bd7c 100%);
  background-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  -webkit-mask-position: center;
  mask-position: center;
}

.worldmap__mark {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;
  transform: translate(-4px, -4px);
}

.worldmap__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--c-primary);
  position: relative;
  flex: none;
}

.worldmap__dot::after {
  content: '';
  position: absolute;
  inset: -7px;
  border-radius: 50%;
  border: 2px solid var(--c-primary);
  opacity: 0;
}

@media (prefers-reduced-motion: no-preference) {
  .worldmap__dot::after {
    animation: map-pulse 2.4s ease-out infinite;
  }

  @keyframes map-pulse {
    0% { transform: scale(0.4); opacity: 0.9; }
    70% { transform: scale(1.6); opacity: 0; }
    100% { transform: scale(1.6); opacity: 0; }
  }
}

.worldmap__label {
  font-size: clamp(11px, 1vw, 13px);
  font-weight: 600;
  color: var(--c-primary);
  background: rgba(255, 255, 255, 0.85);
  padding: 3px 10px;
  border-radius: 999px;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 166, 81, 0.18);
}

/* 标记位置(相对地图容器百分比,依据 @svg-maps/world 投影目测校准) */
.worldmap__mark--shanghai {
  left: 74.5%;
  top: 45%;
}

.worldmap__mark--usa {
  left: 21%;
  top: 42%;
}

.worldmap__mark--egypt {
  left: 55.5%;
  top: 49%;
}

.worldmap__mark--india {
  left: 66.5%;
  top: 51%;
}

.worldmap__mark--malaysia {
  left: 71.5%;
  top: 60%;
}

.center {
  text-align: center;
}

.cta {
  background: var(--c-bg);
  text-align: center;
  padding: clamp(48px, 6vw, 72px) 0;
}

.cta h2 {
  font-size: clamp(24px, 2.4vw, 30px);
  color: var(--c-text);
  margin-bottom: 12px;
}

.cta p {
  max-width: 560px;
  margin: 0 auto 26px;
  color: var(--c-text-secondary);
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

  /* 小屏地图小:只保留上海标签,其余标记只显示圆点;上海标签翻到圆点左侧避免溢出 */
  .worldmap__label {
    display: none;
  }

  .worldmap__mark--shanghai .worldmap__label {
    display: inline-block;
  }

  .worldmap__mark--shanghai {
    transform: translate(calc(-100% + 4px), -4px);
  }

  .worldmap__label {
    font-size: 11px;
    padding: 2px 8px;
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
