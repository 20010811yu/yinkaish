<template>
  <article class="news-card" @click="$router.push(`/news/${item.id}`)">
    <div class="news-card__head">
      <span class="news-card__tag">{{ pick(item.tag, locale) }}</span>
      <time class="news-card__date">{{ item.date }}</time>
    </div>
    <h3>{{ pick(item.title, locale) }}</h3>
    <p>{{ pick(item.summary, locale) }}</p>
    <span class="news-card__more">{{ $t('common.readMore') }} →</span>
  </article>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { pick } from '../data/lang'

const props = defineProps({
  item: { type: Object, required: true },
})

const { locale } = useI18n()
</script>

<style scoped>
.news-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid var(--c-border);
  border-top: 2px solid var(--c-primary-light);
  border-radius: var(--radius);
  padding: 24px 22px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  min-width: 0;
  overflow-wrap: anywhere;
}

.news-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
  border-top-color: var(--c-primary);
}

.news-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 14px;
}

.news-card__tag {
  font-size: 12px;
  font-weight: 600;
  color: var(--c-primary);
  background: var(--c-primary-light);
  border-radius: 999px;
  padding: 3px 12px;
  white-space: nowrap;
}

.news-card__date {
  font-size: 13px;
  color: var(--c-text-secondary);
  white-space: nowrap;
}

.news-card h3 {
  font-size: 17px;
  line-height: 1.5;
  margin-bottom: 10px;
}

.news-card p {
  font-size: 14px;
  line-height: 1.75;
  color: var(--c-text-secondary);
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-card__more {
  margin-top: auto;
  font-size: 13px;
  font-weight: 600;
  color: var(--c-primary);
}
</style>
