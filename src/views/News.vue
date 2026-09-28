<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <h1 class="section-title">{{ $t('news.title') }}</h1>
        <p class="section-subtitle">{{ $t('news.subtitle') }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <!-- 置顶头条(最新一条) + 迷你日历:左右分离 -->
        <div class="featured-row">
          <article class="featured" data-reveal @click="$router.push(`/news/${featured.id}`)">
            <div class="featured__body">
              <span class="featured__chip">{{ $t('news.featured') }}</span>
              <span class="featured__tag">{{ pick(featured.tag, locale) }}</span>
              <h2>{{ pick(featured.title, locale) }}</h2>
              <p>{{ pick(featured.summary, locale) }}</p>
              <span class="featured__more">{{ $t('common.readMore') }} →</span>
            </div>
          </article>
          <div class="cal-panel">
            <!-- 迷你日历:有新闻的日期圆点标注,点击跳详情 -->
            <div class="mini-cal" @click.stop>
              <div class="mini-cal__head">
                <button class="mini-cal__nav" aria-label="prev month" @click.stop="calShift(-1)">‹</button>
                <span class="mini-cal__ym">{{ calYmLabel }}</span>
                <button class="mini-cal__nav" aria-label="next month" @click.stop="calShift(1)">›</button>
              </div>
              <div class="mini-cal__week">
                <span v-for="w in weekLabels" :key="w">{{ w }}</span>
              </div>
              <div class="mini-cal__grid">
                <span v-for="(d, i) in calCells" :key="i" class="mini-cal__cell" :class="d.cls" @click.stop="onPickDay(d)">
                  <span class="mini-cal__num">{{ d.day ?? '' }}</span>
                  <span v-if="d.newsId" class="mini-cal__dot"></span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 新闻网格 -->
        <div class="news-grid">
          <div v-for="(n, i) in rest" :key="n.id" data-reveal :data-reveal-delay="(i % 3) + 1">
            <NewsCard :item="n" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { news } from '../data'
import { pick } from '../data/lang'
import { useReveal } from '../composables/useReveal'
import NewsCard from '../components/NewsCard.vue'

const { locale } = useI18n()
const router = useRouter()
useReveal()

const featured = computed(() => news[0])
const rest = computed(() => news.slice(1))
const [featuredYear, featuredMonth, featuredDay] = featured.value.date.split('-')
const featuredYearMonth = `${featuredYear}.${featuredMonth}`

/* ---- 迷你日历 ---- */
// 新闻日期 → 新闻 id 映射
const newsByDate = Object.fromEntries(news.map((n) => [n.date, n.id]))
// 日历默认显示今日所在月份
const _today = new Date()
const cal = ref({ y: _today.getFullYear(), m: _today.getMonth() }) // m: 0 基
const selected = ref('')

const weekLabels = computed(() =>
  locale.value === 'en'
    ? ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    : ['日', '一', '二', '三', '四', '五', '六']
)
const calYmLabel = computed(() => {
  const { y, m } = cal.value
  return locale.value === 'en'
    ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][m] + ` ${y}`
    : `${y}.${String(m + 1).padStart(2, '0')}`
})

const calShift = (dir) => {
  cal.value.m += dir
  if (cal.value.m < 0) { cal.value.m = 11; cal.value.y-- }
  if (cal.value.m > 11) { cal.value.m = 0; cal.value.y++ }
}

const pad = (n) => String(n).padStart(2, '0')
const todayStr = new Date().toLocaleDateString('sv') // YYYY-MM-DD(本地时区)

// 42 格(6 行 × 7 列,周日起):前后补上月/下月日期
const calCells = computed(() => {
  const { y, m } = cal.value
  const firstDow = new Date(y, m, 1).getDay()
  const daysInMonth = new Date(y, m + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < 42; i++) {
    const dayNum = i - firstDow + 1
    const inMonth = dayNum >= 1 && dayNum <= daysInMonth
    const dateStr = inMonth ? `${y}-${pad(m + 1)}-${pad(dayNum)}` : ''
    const newsId = newsByDate[dateStr]
    const cls = [
      !inMonth && 'mini-cal__cell--out',
      dateStr === todayStr && 'mini-cal__cell--today',
      dateStr && selected.value === dateStr && 'mini-cal__cell--sel',
      newsId && 'mini-cal__cell--has',
    ].filter(Boolean)
    cells.push({ day: inMonth ? dayNum : (dayNum <= 0 ? new Date(y, m, 0).getDate() + dayNum : dayNum - daysInMonth), newsId, cls: cls.join(' ') })
  }
  return cells
})

const onPickDay = (d) => {
  if (!d.day) return
  const dateStr = `${cal.value.y}-${pad(cal.value.m + 1)}-${pad(d.day)}`
  selected.value = dateStr
  if (d.newsId) router.push(`/news/${d.newsId}`)
}
</script>

<style scoped>
/* 置顶头条 + 日历:左右独立两块 */
.featured-row {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 24px;
  align-items: stretch;
}

.featured {
  background: #fff;
  border: 1px solid var(--c-border);
  border-radius: var(--radius);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  min-width: 0;
}

.featured:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.featured__body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: clamp(24px, 3vw, 40px);
  min-width: 0;
}

.featured__chip {
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  background: var(--c-primary);
  border-radius: 999px;
  padding: 4px 14px;
  margin-bottom: 14px;
}

.featured__tag {
  font-size: 13px;
  font-weight: 600;
  color: var(--c-primary);
  background: var(--c-primary-light);
  border-radius: 999px;
  padding: 4px 14px;
  margin-bottom: 18px;
}

.featured__body h2 {
  font-size: clamp(20px, 2.2vw, 28px);
  line-height: 1.45;
  margin-bottom: 12px;
  overflow-wrap: anywhere;
}

.featured__body p {
  font-size: 15px;
  line-height: 1.85;
  color: var(--c-text-secondary);
  margin-bottom: 22px;
  overflow-wrap: anywhere;
}

.featured__more {
  margin-top: auto;
  font-size: 14px;
  font-weight: 700;
  color: var(--c-primary);
}

/* 迷你日历面板 */
/* 日历面板:独立于头条卡片 */
.cal-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(160deg, var(--c-primary-light) 0%, rgba(0, 166, 81, 0.28) 60%, rgba(0, 166, 81, 0.55) 100%);
  border-radius: var(--radius);
  padding: clamp(14px, 1.6vw, 22px);
  min-height: 220px;
}

.mini-cal {
  width: 100%;
  max-width: 460px;
  background: linear-gradient(180deg, #f2fbf6 0%, #d9f2e4 45%, #a8dfc2 100%); /* 自上而下渐变加深 */
  padding: clamp(18px, 2.2vw, 30px) clamp(20px, 2.4vw, 34px) clamp(16px, 2vw, 26px);
}

.mini-cal__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.mini-cal__ym {
  font-weight: 700;
  color: var(--c-primary-dark);
  letter-spacing: 1px;
}

.mini-cal__nav {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: var(--c-primary-light);
  color: var(--c-primary-dark);
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s;
}

.mini-cal__nav:hover {
  background: rgb(0 166 81 / 28%);
}

.mini-cal__week,
.mini-cal__grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.mini-cal__week span {
  text-align: center;
  font-size: 14px;
  color: var(--c-text-secondary);
  padding: 5px 0;
}

.mini-cal__cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 4px 0 2px;
  border-radius: 8px;
  font-size: 15px;
  color: var(--c-text);
  cursor: default;
  min-height: 34px;
  justify-content: center;
}

.mini-cal__cell--out {
  color: rgb(0 0 0 / 25%);
}

.mini-cal__cell--has {
  cursor: pointer;
  color: var(--c-primary-dark);
  font-weight: 700;
}

.mini-cal__cell--has:hover {
  background: var(--c-primary-light);
}

.mini-cal__cell--today {
  box-shadow: inset 0 0 0 1.5px var(--c-primary);
}

.mini-cal__cell--sel {
  background: var(--c-primary);
}

.mini-cal__cell--sel .mini-cal__num {
  color: #fff;
}

.mini-cal__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--c-primary);
}

/* 新闻网格 */
.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  margin-top: clamp(28px, 3.5vw, 44px);
}

.news-grid > * {
  min-width: 0;
}

@media (max-width: 1024px) {
  .featured-row {
    grid-template-columns: 1fr;
  }

  .news-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
