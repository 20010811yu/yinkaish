<template>
  <article class="news-card" @click="$router.push(`/news/${item.id}`)">
    <div class="news-card__date">
      <span class="news-card__day">{{ day }}</span>
      <span class="news-card__month">{{ month }}</span>
    </div>
    <div class="news-card__body">
      <h3>{{ pick(item.title, locale) }}</h3>
      <p>{{ pick(item.summary, locale) }}</p>
      <span class="news-card__more">{{ $t('common.readMore') }} →</span>
    </div>
  </article>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { pick } from '../data/lang'

const props = defineProps({
  item: { type: Object, required: true },
})

const { locale } = useI18n()
const [year, month, day] = props.item.date.split('-')</script>

<style scoped>
.news-card {
  display: flex;
  gap: 18px;
  background: #fff;
  border: 1px solid var(--c-border);
  border-radius: var(--radius);
  padding: 22px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.news-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow);
}

.news-card__date {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 64px;
  height: 64px;
  border-radius: 10px;
  background: var(--c-primary-light);
  color: var(--c-primary);
  font-weight: 700;
}

.news-card__day {
  font-size: 20px;
  line-height: 1.1;
}

.news-card__month {
  font-size: 12px;
}

.news-card__body h3 {
  font-size: 17px;
  margin-bottom: 6px;
}

.news-card__body p {
  font-size: 14px;
  color: var(--c-text-secondary);
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-card__more {
  font-size: 13px;
  color: var(--c-primary);
  font-weight: 600;
}
</style>
