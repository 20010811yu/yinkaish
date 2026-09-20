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
        <!-- 置顶头条(最新一条) -->
        <article class="featured" data-reveal @click="$router.push(`/news/${featured.id}`)">
          <div class="featured__body">
            <span class="featured__chip">{{ $t('news.featured') }}</span>
            <span class="featured__tag">{{ pick(featured.tag, locale) }}</span>
            <h2>{{ pick(featured.title, locale) }}</h2>
            <p>{{ pick(featured.summary, locale) }}</p>
            <span class="featured__more">{{ $t('common.readMore') }} →</span>
          </div>
          <div class="featured__panel" aria-hidden="true">
            <span class="featured__day">{{ featuredDay }}</span>
            <span class="featured__ym">{{ featuredYearMonth }}</span>
          </div>
        </article>

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
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { news } from '../data'
import { pick } from '../data/lang'
import { useReveal } from '../composables/useReveal'
import NewsCard from '../components/NewsCard.vue'

const { locale } = useI18n()
useReveal()

const featured = computed(() => news[0])
const rest = computed(() => news.slice(1))
const [featuredYear, featuredMonth, featuredDay] = featured.value.date.split('-')
const featuredYearMonth = `${featuredYear}.${featuredMonth}`
</script>

<style scoped>
/* 置顶头条:左内容 + 右品牌绿渐变日期面板 */
.featured {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
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

.featured__panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: linear-gradient(160deg, var(--c-primary-light) 0%, rgba(0, 166, 81, 0.55) 60%, var(--c-primary) 100%);
  color: var(--c-primary);
  min-height: 220px;
}

.featured__day {
  font-size: clamp(56px, 6vw, 84px);
  font-weight: 800;
  line-height: 1;
  color: #fff;
}

.featured__ym {
  font-size: clamp(15px, 1.4vw, 18px);
  font-weight: 700;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.85);
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
  .featured {
    grid-template-columns: 1fr;
  }

  .featured__panel {
    min-height: 140px;
    flex-direction: row;
    gap: 14px;
    order: -1;
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
