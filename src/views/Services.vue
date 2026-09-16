<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <h1 class="section-title">{{ $t('services.title') }}</h1>
        <p class="section-subtitle">{{ $t('services.subtitle') }}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="svc">
          <div v-for="(s, i) in services" :key="s.id" class="svc__row" :class="{ 'svc__row--reverse': i % 2 === 1 }">
            <div class="svc__visual">
              <el-icon :size="64" color="#fff"><component :is="icons[s.icon]" /></el-icon>
            </div>
            <div class="svc__body">
              <h3>{{ pick(s.name, locale) }}</h3>
              <p>{{ pick(s.desc, locale) }}</p>
              <el-button type="primary" text @click="$router.push('/contact')">
                {{ $t('common.learnMore') }} →
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { Monitor, Cloudy, Cpu, Compass } from '@element-plus/icons-vue'
import { services } from '../data'
import { pick } from '../data/lang'

const { locale } = useI18n()

const icons = { Monitor, Cloudy, Cpu, Compass }
</script>

<style scoped>
.svc {
  display: grid;
  gap: 56px;
}

.svc__row {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 40px;
  align-items: center;
}

.svc__row--reverse {
  grid-template-columns: 1.6fr 1fr;
}

.svc__row--reverse .svc__visual {
  order: 2;
}

.svc__visual {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
  border-radius: var(--radius);
  background: linear-gradient(135deg, #123a8f 0%, #1e6fff 100%);
}

.svc__body h3 {
  font-size: 22px;
  margin-bottom: 10px;
}

.svc__body p {
  color: var(--c-text-secondary);
  margin-bottom: 12px;
}

@media (max-width: 768px) {
  .svc {
    gap: 36px;
  }

  .svc__row,
  .svc__row--reverse {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .svc__visual {
    height: 130px;
  }

  .svc__row--reverse .svc__visual {
    order: 0;
  }
}
</style>
