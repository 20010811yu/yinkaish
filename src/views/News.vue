<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <h1 class="section-title">{{ $t('news.title') }}</h1>
        <p class="section-subtitle">{{ $t('news.subtitle') }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container news-list">
        <NewsCard v-for="n in news" :key="n.id" :item="n" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { news } from '../data'
import NewsCard from '../components/NewsCard.vue'
</script>

<style scoped>
.news-list {
  display: grid;
  gap: 16px;
}
</style>
