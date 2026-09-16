<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <h1 class="section-title">{{ $t('about.title') }}</h1>
        <p class="section-subtitle">{{ $t('about.subtitle') }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="mvv">
          <div v-for="m in mvv" :key="m.icon" class="mvv__item">
            <el-icon :size="32" color="var(--c-primary)"><component :is="m.icon" /></el-icon>
            <h3>{{ $t(`about.${m.key}.title`) }}</h3>
            <p>{{ $t(`about.${m.key}.desc`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container">
        <div class="section-head">
          <h2 class="section-title">{{ $t('about.historyTitle') }}</h2>
        </div>
        <el-timeline class="timeline">
          <el-timeline-item
            v-for="m in milestones"
            :key="m.year"
            :timestamp="m.year"
            placement="top"
            type="primary"
          >
            {{ pick(m.text, locale) }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </section>

    <section class="section">
      <div class="container culture">
        <div class="section-head">
          <h2 class="section-title">{{ $t('about.cultureTitle') }}</h2>
          <p class="section-subtitle">{{ $t('about.cultureDesc') }}</p>
        </div>
        <div class="culture__keywords">
          <el-tag v-for="k in keywords" :key="k" size="large" effect="plain" round>{{ k }}</el-tag>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Aim, View, Medal } from '@element-plus/icons-vue'
import { milestones } from '../data'
import { pick } from '../data/lang'

const { locale, t } = useI18n()

const mvv = [
  { key: 'mission', icon: Aim },
  { key: 'vision', icon: View },
  { key: 'values', icon: Medal },
]

const keywords = computed(() => [
  t('about.mission.title'),
  t('about.vision.title'),
  t('about.values.title'),
])
</script>

<style scoped>
.mvv {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.mvv__item {
  text-align: center;
  background: var(--c-bg-soft);
  border-radius: var(--radius);
  padding: 36px 24px;
}

.mvv__item h3 {
  margin: 14px 0 8px;
  font-size: 18px;
}

.mvv__item p {
  color: var(--c-text-secondary);
  font-size: 14px;
}

.timeline {
  max-width: 640px;
  margin: 0 auto;
  padding-left: 12px;
}

.culture__keywords {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
}

@media (max-width: 768px) {
  .mvv {
    grid-template-columns: 1fr;
  }
}
</style>
