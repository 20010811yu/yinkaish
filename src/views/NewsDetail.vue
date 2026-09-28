<template>
  <div>
    <section class="detail-hero">
      <div class="container">
        <div class="detail-hero__top">
          <RouterLink class="detail-hero__back" to="/news">← {{ $t('common.backToList') }}</RouterLink>
          <span v-if="article" class="detail-hero__tag">{{ pick(article.tag, locale) }}</span>
        </div>
        <h1 class="detail-hero__title">{{ title || $t('newsDetail.notFound') }}</h1>
        <p v-if="article" class="detail-hero__meta">
          <el-icon><Calendar /></el-icon>
          {{ $t('newsDetail.date') }}：{{ article.date }}
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container detail">
        <template v-if="article">
          <p v-for="(para, i) in paragraphs" :key="i" class="detail__content">{{ para }}</p>
        </template>
        <p v-else class="detail__content">{{ $t('newsDetail.notFound') }}</p>
        <div class="detail__footer">
          <el-button round @click="$router.push('/news')">← {{ $t('common.backToList') }}</el-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Calendar } from '@element-plus/icons-vue'
import { news } from '../data'
import { pick } from '../data/lang'

const route = useRoute()
const { locale } = useI18n()

const article = computed(() => news.find((n) => String(n.id) === String(route.params.id)))
const title = computed(() => (article.value ? pick(article.value.title, locale.value) : ''))
const paragraphs = computed(() => {
  if (!article.value) return []
  return pick(article.value.content, locale.value).split('\n').filter((p) => p.trim())
})
</script>

<style scoped>
/* 页头:浅色底,左对齐,替代原绿色横幅 */
.detail-hero {
  background: var(--c-bg-soft);
  padding: clamp(28px, 4vw, 48px) 0 clamp(32px, 4vw, 52px);
}

.detail-hero__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: clamp(18px, 2.5vw, 28px);
}

.detail-hero__back {
  color: var(--c-text-secondary);
  text-decoration: none;
  font-size: 0.9375rem;
  transition: color 0.2s;
}

.detail-hero__back:hover {
  color: var(--c-primary);
}

.detail-hero__tag {
  padding: 4px 14px;
  border-radius: 999px;
  background: rgb(0 166 81 / 10%);
  color: var(--c-primary);
  font-size: 0.8125rem;
  white-space: nowrap;
}

.detail-hero__title {
  font-size: clamp(24px, 2.8vw, 36px);
  font-weight: 700;
  color: var(--c-text);
  line-height: 1.4;
  margin-bottom: 14px;
  overflow-wrap: anywhere;
}

.detail-hero__meta {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--c-text-secondary);
  font-size: 0.9375rem;
}

/* 正文:限宽居中,多段落 */
.detail {
  max-width: 720px;
}

.detail__content {
  font-size: clamp(15px, 1vw + 8px, 17px);
  line-height: 1.95;
  color: var(--c-text);
  margin-bottom: 20px;
  overflow-wrap: anywhere;
}

.detail__footer {
  margin-top: 40px;
  padding-top: 28px;
  border-top: 1px solid var(--c-border);
  text-align: center;
}
</style>
