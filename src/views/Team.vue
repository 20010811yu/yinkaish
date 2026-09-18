<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <h1 class="section-title">{{ $t('team.title') }}</h1>
        <p class="section-subtitle">{{ $t('team.subtitle') }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="team">
          <div v-for="m in team" :key="m.id" class="member">
            <div class="member__avatar">{{ initials(m.name) }}</div>
            <h3>{{ pick(m.name, locale) }}</h3>
            <p class="member__title">{{ pick(m.title, locale) }}</p>
            <p class="member__desc">{{ pick(m.desc, locale) }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--soft center">
      <h2 class="section-title">{{ $t('team.cta') }}</h2>
      <el-button type="primary" round size="large" @click="$router.push('/careers')">
        {{ $t('team.ctaBtn') }}
      </el-button>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { team } from '../data'
import { pick } from '../data/lang'

const { locale } = useI18n()

const initials = (name) => pick(name, locale).slice(0, 1)
</script>

<style scoped>
.team {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
}

.member {
  background: #fff;
  border: 1px solid var(--c-border);
  border-radius: var(--radius);
  padding: 30px 20px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.member:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.member__avatar {
  width: 72px;
  height: 72px;
  margin: 0 auto 14px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--c-primary), var(--c-primary-dark));
  color: #fff;
  font-size: 26px;
  font-weight: 700;
}

.member h3 {
  font-size: 17px;
}

.member__title {
  font-size: 13px;
  color: var(--c-primary);
  font-weight: 600;
  margin: 4px 0 8px;
}

.member__desc {
  font-size: 13px;
  color: var(--c-text-secondary);
}

.center {
  text-align: center;
}

.center .section-title {
  margin-bottom: 20px;
}

@media (max-width: 1024px) {
  .team {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .team {
    grid-template-columns: 1fr;
  }
}
</style>
