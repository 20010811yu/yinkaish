<template>
  <div>
    <section class="detail-hero">
      <div class="container">
        <div class="detail-hero__top">
          <RouterLink class="detail-hero__back" to="/news">← {{ $t('common.backToList') }}</RouterLink>
        </div>
        <h1 class="detail-hero__title">{{ title || $t('newsDetail.notFound') }}</h1>
        <div v-if="article" class="detail-hero__meta">
          <el-icon><Calendar /></el-icon>
          {{ $t('newsDetail.date') }}：{{ article.date }}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container detail">
        <template v-if="article">
          <!-- 管理端 wangEditor 产出富文本 HTML;存量纯文本按 \n 分段渲染 -->
          <div v-if="isRich" class="detail__rich" v-html="rawContent"></div>
          <template v-else>
            <p v-for="(para, i) in paragraphs" :key="i" class="detail__content">{{ para }}</p>
          </template>
        </template>
        <p v-else class="detail__content">{{ $t('newsDetail.notFound') }}</p>
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
const rawContent = computed(() => (article.value ? pick(article.value.content, locale.value) : ''))
const isRich = computed(() => rawContent.value.trimStart().startsWith('<'))
const paragraphs = computed(() =>
  rawContent.value.split('\n').filter((p) => p.trim())
)
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

.detail-hero__title {
  font-size: clamp(24px, 2.8vw, 36px);
  font-weight: 700;
  color: var(--c-text);
  line-height: 1.4;
  margin-bottom: 14px;
  text-align: center;
  overflow-wrap: anywhere;
}

.detail-hero__meta {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  color: var(--c-text-secondary);
  font-size: 0.9375rem;
}

@media (max-width: 560px) {
  .detail-hero__top {
    flex-wrap: wrap;
    row-gap: 10px;
  }

  .detail-hero__meta {
    margin-left: auto;
  }
}

/* 正文:限宽居中,多段落 */
.detail {
  max-width: 720px;
}

.detail__content {
  font-size: clamp(15px, 1vw + 8px, 17px);
  line-height: 1.95;
  color: var(--c-text);
  margin-bottom: 1.95em; /* 段间空一行(与行高等同) */
  text-indent: 2em; /* 首行缩进两字 */
  overflow-wrap: anywhere;
}

/* 富文本正文(管理端 wangEditor 产出):v-html 内容无 scoped 属性,须 :deep() */
.detail__rich {
  font-size: clamp(15px, 1vw + 8px, 17px);
  line-height: 1.95;
  color: var(--c-text);
  overflow-wrap: anywhere;
}
.detail__rich :deep(p) {
  margin: 0 0 1.2em;
  text-indent: 2em;
}
.detail__rich :deep(h1),
.detail__rich :deep(h2),
.detail__rich :deep(h3),
.detail__rich :deep(h4) {
  margin: 1.6em 0 0.8em;
  line-height: 1.4;
  color: var(--c-text);
}
.detail__rich :deep(h2) {
  font-size: 1.25em;
}
.detail__rich :deep(h3) {
  font-size: 1.1em;
}
.detail__rich :deep(ul),
.detail__rich :deep(ol) {
  margin: 0 0 1.2em;
  padding-left: 2em;
  /* 全局 reset 去掉了 list-style,富文本列表需恢复 */
  list-style: revert;
}
.detail__rich :deep(li) {
  margin-bottom: 0.4em;
}
.detail__rich :deep(blockquote) {
  margin: 0 0 1.2em;
  padding: 0.6em 1em;
  border-left: 3px solid var(--c-primary);
  background: var(--c-bg-soft);
  color: var(--c-text-secondary);
}
.detail__rich :deep(blockquote p) {
  text-indent: 0;
  margin: 0;
}
.detail__rich :deep(a) {
  color: var(--c-primary);
}
.detail__rich :deep(img),
.detail__rich :deep(video) {
  max-width: 100%;
}
.detail__rich :deep(table) {
  border-collapse: collapse;
  margin: 0 0 1.2em;
}
.detail__rich :deep(th),
.detail__rich :deep(td) {
  border: 1px solid var(--el-border-color, #dcdfe6);
  padding: 6px 10px;
}
.detail__rich :deep(pre) {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
</style>
