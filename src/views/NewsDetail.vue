<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <h1 class="section-title">{{ title || $t('newsDetail.notFound') }}</h1>
        <p v-if="article" class="section-subtitle">{{ $t('newsDetail.date') }}：{{ article.date }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container detail">
        <template v-if="article">
          <p class="detail__content">{{ pick(article.content, locale) }}</p>
        </template>
        <p v-else class="detail__content">{{ $t('newsDetail.notFound') }}</p>
        <el-button round @click="$router.push('/news')">← {{ $t('common.backToList') }}</el-button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { news } from '../data'
import { pick } from '../data/lang'

const route = useRoute()
const { locale } = useI18n()

const article = computed(() => news.find((n) => String(n.id) === String(route.params.id)))
const title = computed(() => (article.value ? pick(article.value.title, locale.value) : ''))
</script>

<style scoped>
.detail {
  max-width: 760px;
}

.detail__content {
  font-size: 16px;
  line-height: 1.9;
  color: var(--c-text);
  margin-bottom: 32px;
  overflow-wrap: anywhere;
}
</style>
