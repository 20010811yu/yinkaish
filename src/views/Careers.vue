<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <h1 class="section-title">{{ $t('careers.title') }}</h1>
        <p class="section-subtitle">{{ $t('careers.subtitle') }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="jobs">
          <el-card v-for="j in jobs" :key="j.id" shadow="hover" class="job">
            <div class="job__row">
              <div>
                <h3>{{ pick(j.title, locale) }}</h3>
                <p class="job__meta">
                  <el-tag size="small" effect="plain">{{ pick(j.dept, locale) }}</el-tag>
                  <el-tag size="small" effect="plain" type="info">{{ pick(j.location, locale) }}</el-tag>
                </p>
              </div>
              <el-button type="primary" round @click="apply">{{ $t('careers.apply') }}</el-button>
            </div>
          </el-card>
        </div>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container">
        <div class="section-head">
          <h2 class="section-title">{{ $t('careers.welfareTitle') }}</h2>
        </div>
        <div class="welfares">
          <div v-for="(w, i) in welfares" :key="i" class="welfare">
            <el-icon :size="26" color="var(--c-primary)"><component :is="icons[w.icon]" /></el-icon>
            <span>{{ pick(w.text, locale) }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import {
  Opportunity, Coin, Umbrella, AlarmClock, Reading, Watermelon,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { jobs, welfares } from '../data'
import { pick } from '../data/lang'

const { locale, t } = useI18n()

const icons = { Opportunity, Coin, Umbrella, AlarmClock, Reading, Watermelon }

const apply = () => {
  ElMessage.info(t('contact.form.success'))
}
</script>

<style scoped>
.jobs {
  display: grid;
  gap: 14px;
}

.job :deep(.el-card__body) {
  padding: 20px 24px;
}

.job__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.job h3 {
  font-size: 17px;
  margin-bottom: 8px;
}

.job__meta {
  display: flex;
  gap: 8px;
}

.welfares {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.welfare {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #fff;
  border: 1px solid var(--c-border);
  border-radius: var(--radius);
  padding: 18px 20px;
  font-size: 14px;
}

@media (max-width: 768px) {
  .job__row {
    flex-direction: column;
    align-items: flex-start;
  }

  .welfares {
    grid-template-columns: 1fr;
  }
}
</style>
