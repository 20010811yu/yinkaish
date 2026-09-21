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
          <el-card v-for="j in jobs" :key="j.id" shadow="hover" class="job" :class="{ 'job--open': expanded.has(j.id) }">
            <div class="job__row" @click="toggle(j.id)">
              <div>
                <h3>{{ pick(j.title, locale) }}</h3>
                <p class="job__meta">
                  <el-tag size="small" effect="plain">{{ pick(j.dept, locale) }}</el-tag>
                  <el-tag size="small" effect="plain" type="info">{{ pick(j.location, locale) }}</el-tag>
                </p>
              </div>
              <div class="job__actions">
                <el-button type="primary" round @click.stop="apply">{{ $t('careers.apply') }}</el-button>
                <el-icon class="job__chevron" :class="{ 'job__chevron--open': expanded.has(j.id) }"><ArrowDown /></el-icon>
              </div>
            </div>
            <div class="job__detail" :class="{ 'job__detail--open': expanded.has(j.id) }">
              <div class="job__detail-inner">
                <p v-for="(line, li) in pick(j.desc, locale).split('\n')" :key="li">{{ line }}</p>
              </div>
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
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  Opportunity, Coin, Umbrella, AlarmClock, Reading, Watermelon, ArrowDown,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'
import { jobs, welfares } from '../data'
import { pick } from '../data/lang'

const { locale, t } = useI18n()

const icons = { Opportunity, Coin, Umbrella, AlarmClock, Reading, Watermelon }

// 展开的职位 id 集合(可同时展开多个)
const expanded = ref(new Set())

const toggle = (id) => {
  const next = new Set(expanded.value)
  next.has(id) ? next.delete(id) : next.add(id)
  expanded.value = next
}

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
  cursor: pointer;
  user-select: none;
}

.job__actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: none;
}

.job__chevron {
  color: var(--c-primary);
  transition: transform 0.25s;
}

.job__chevron--open {
  transform: rotate(180deg);
}

/* 详情展开/收起:grid rows 过渡,平滑且内容高度自适应 */
.job__detail {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease;
}

.job__detail--open {
  grid-template-rows: 1fr;
}

.job__detail-inner {
  overflow: hidden;
}

.job__detail-inner p {
  margin-top: 14px;
  font-size: 14px;
  line-height: 1.85;
  color: var(--c-text-secondary);
  overflow-wrap: anywhere;
}

.job h3 {
  font-size: 17px;
  margin-bottom: 8px;
}

.job__meta {
  display: flex;
  flex-wrap: wrap;
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

@media (max-width: 1024px) {
  .welfares {
    grid-template-columns: repeat(2, 1fr);
  }
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
