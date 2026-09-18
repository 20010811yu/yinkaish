<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <h1 class="section-title">{{ $t('services.title') }}</h1>
        <p class="section-subtitle">{{ $t('services.subtitle') }}</p>
      </div>
    </section>

    <section v-for="cat in productCategories" :key="cat.id" class="section" :class="{ 'section--soft': alt(cat.id) }">
      <div class="container">
        <div class="section-head">
          <span class="section-tag">{{ String(indexOf(cat.id) + 1).padStart(2, '0') }}</span>
          <h2 class="section-title">{{ pick(cat.name, locale) }}</h2>
          <p class="section-subtitle">{{ pick(cat.desc, locale) }}</p>
        </div>
        <div class="prods">
          <article v-for="p in cat.products" :key="p.model" class="prod">
            <div class="prod__fig">
              <img :src="p.image" :alt="p.model" loading="lazy" />
            </div>
            <div class="prod__body">
              <div class="prod__title-row">
                <h3>{{ p.model }}</h3>
                <span class="prod__tag">{{ pick(p.tag, locale) }}</span>
              </div>
              <p>{{ pick(p.desc, locale) }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="cta-band">
      <div class="container">
        <h2>{{ $t('services.ctaTitle') }}</h2>
        <p>{{ $t('services.ctaDesc') }}</p>
        <el-button type="primary" size="large" round @click="$router.push('/contact')">
          {{ $t('services.ctaBtn') }}
        </el-button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { productCategories } from '../data'
import { pick } from '../data/lang'

const { locale } = useI18n()

// 分类序号(编号标签)
const indexOf = (id) => productCategories.findIndex((c) => c.id === id)
// 偶数分类用浅底软隔断,奇数用白底
const alt = (id) => indexOf(id) % 2 === 0
</script>

<style scoped>
.prods {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 26px;
}

.prod {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid var(--c-border);
  border-radius: var(--radius);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.prod:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.prod__fig {
  background: #fff;
  border-bottom: 1px solid var(--c-border);
  /* 产品图白底 3:2,等比完整呈现 */
  aspect-ratio: 3 / 2;
}

.prod__fig img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 14px;
}

.prod__body {
  padding: 18px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.prod__title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.prod__title-row h3 {
  font-size: 1.25rem;
  color: var(--c-primary);
  letter-spacing: 0.5px;
}

.prod__tag {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--c-primary);
  background: var(--c-primary-light);
  border-radius: 999px;
  padding: 3px 12px;
  white-space: nowrap;
}

.prod__body p {
  font-size: 0.875rem;
  color: var(--c-text-secondary);
  line-height: 1.75;
}

/* 底部咨询横带 */
.cta-band {
  background: linear-gradient(135deg, #0a5c33 0%, #00a651 100%);
  color: #fff;
  text-align: center;
  padding: clamp(48px, 6vw, 72px) 0;
}

.cta-band h2 {
  font-size: clamp(24px, 2.4vw, 30px);
  margin-bottom: 12px;
}

.cta-band p {
  max-width: 560px;
  margin: 0 auto 26px;
  color: rgba(255, 255, 255, 0.85);
}

@media (max-width: 1024px) {
  .prods {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .prods {
    grid-template-columns: 1fr;
  }
}
</style>
