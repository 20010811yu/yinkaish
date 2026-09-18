<template>
  <div class="home">
    <!-- Hero 轮播 -->
    <HeroCarousel />

    <!-- 公司简介 + 数据 -->
    <section class="section">
      <div class="container">
        <div class="intro">
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
        <div class="section-head">
          <span class="section-tag">{{ $t('home.services.tag') }}</span>
          <h2 class="section-title">{{ $t('home.services.title') }}</h2>
        </div>
        <div class="cards">
          <div v-for="s in services" :key="s.id" class="card">
            <el-icon :size="30" color="var(--c-primary)"><component :is="icons[s.icon]" /></el-icon>
            <h3>{{ pick(s.name, locale) }}</h3>
            <p>{{ pick(s.desc, locale) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心优势 -->
    <section class="section">
      <div class="container">
        <div class="section-head">
          <span class="section-tag">{{ $t('home.advantages.tag') }}</span>
          <h2 class="section-title">{{ $t('home.advantages.title') }}</h2>
        </div>
        <div class="cards cards--4">
          <div v-for="(key, i) in ['a1', 'a2', 'a3', 'a4']" :key="key" class="card">
            <span class="card__num">0{{ i + 1 }}</span>
            <h3>{{ $t(`home.advantages.${key}.title`) }}</h3>
            <p>{{ $t(`home.advantages.${key}.desc`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 新闻动态 -->
    <section class="section section--soft">
      <div class="container">
        <div class="section-head">
          <span class="section-tag">{{ $t('home.news.tag') }}</span>
          <h2 class="section-title">{{ $t('home.news.title') }}</h2>
        </div>
        <div class="news-list">
          <NewsCard v-for="n in latestNews" :key="n.id" :item="n" />
        </div>
        <div class="center">
          <el-button round @click="$router.push('/news')">{{ $t('common.viewAll') }}</el-button>
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
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  SetUp, View, Search, OfficeBuilding,
} from '@element-plus/icons-vue'
import { services, news } from '../data'
import { pick } from '../data/lang'
import NewsCard from '../components/NewsCard.vue'
import HeroCarousel from '../components/HeroCarousel.vue'

const { locale, t } = useI18n()

const icons = { SetUp, View, Search, OfficeBuilding }

const stats = computed(() => [
  { value: '20+', label: t('home.intro.stat1') },
  { value: '200+', label: t('home.intro.stat2') },
  { value: '10000+', label: t('home.intro.stat3') },
  { value: '±0.1', label: t('home.intro.stat4') },
])

const latestNews = news.slice(0, 3)
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

.news-list {
  display: grid;
  gap: 16px;
  margin-bottom: 28px;
}

.center {
  text-align: center;
}

.cta {
  background: linear-gradient(135deg, #0a5c33 0%, #00a651 100%);
  color: #fff;
  text-align: center;
  padding: clamp(48px, 6vw, 72px) 0;
}

.cta h2 {
  font-size: clamp(24px, 2.4vw, 30px);
  margin-bottom: 12px;
}

.cta p {
  max-width: 560px;
  margin: 0 auto 26px;
  color: rgba(255, 255, 255, 0.85);
}

@media (max-width: 1024px) {
  .cards,
  .cards--4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .intro {
    grid-template-columns: 1fr;
    gap: 28px;
  }

  .cards,
  .cards--4 {
    grid-template-columns: 1fr;
  }
}
</style>
