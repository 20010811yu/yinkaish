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

        <div ref="vtEl" class="vt">
          <div
            v-for="(item, i) in reversed"
            :key="item.year"
            class="vt__row"
            :class="[{ 'vt__row--swap': i % 2 === 1 }, rowsVisible[i] ? 'vt__row--in' : '']"
          >
            <div class="vt__media">
              <img v-if="item.image" :src="item.image" :alt="item.year" loading="lazy" />
              <div v-else class="vt__media-year">{{ item.year }}</div>
            </div>
            <div class="vt__spine">
              <span class="vt__dot" />
            </div>
            <div class="vt__body">
              <span class="vt__year">{{ item.year }}</span>
              <h3>{{ pick(item.title, locale) }}</h3>
              <p>{{ pick(item.desc, locale) }}</p>
            </div>
          </div>
        </div>
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
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Aim, View, Medal } from '@element-plus/icons-vue'
import { timeline } from '../data'
import { pick } from '../data/lang'

const { locale, t } = useI18n()

// 时间倒序展示(最新在前)
const reversed = computed(() => [...timeline].reverse())

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

// 进入视口切入、离开视口淡出(双向可重复)
const vtEl = ref(null)
const rowsVisible = ref(reversed.value.map(() => false))
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const idx = Number(entry.target.dataset.index)
        rowsVisible.value[idx] = entry.isIntersecting
      })
    },
    { threshold: 0.25 },
  )
  vtEl.value?.querySelectorAll('.vt__row').forEach((el, i) => {
    el.dataset.index = i
    observer.observe(el)
  })
})

onBeforeUnmount(() => observer?.disconnect())
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

/* 纵向图文时间线:整行占屏约 60% */
.vt {
  max-width: 60vw;
  margin: 0 auto;
}

.vt__row {
  display: grid;
  grid-template-columns: 1fr 64px 1fr;
  align-items: center;
  margin-bottom: 64px;
}

.vt__media {
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  min-height: 320px;
  background: var(--c-primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
}

.vt__media img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  display: block;
}

.vt__media-year {
  font-size: 72px;
  font-weight: 800;
  color: var(--c-primary);
  opacity: 0.45;
}

.vt__spine {
  position: relative;
  align-self: stretch;
  min-height: 320px;
}

.vt__spine::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  transform: translateX(-50%);
  background: linear-gradient(180deg, var(--c-primary-light), var(--c-primary), var(--c-primary-light));
}

.vt__dot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  border: 4px solid var(--c-primary);
  box-shadow: 0 0 0 5px var(--c-primary-light);
}

.vt__body {
  padding: 0 32px;
}

.vt__year {
  display: inline-block;
  font-size: 38px;
  font-weight: 800;
  color: var(--c-primary);
  margin-bottom: 10px;
}

.vt__body h3 {
  font-size: 28px;
  margin-bottom: 12px;
}

.vt__body p {
  font-size: 20px;
  color: var(--c-text-secondary);
  line-height: 1.8;
}

/* 切入/淡出动画:图从行方向滑入,文淡入上移 */
.vt__media,
.vt__body {
  opacity: 0;
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.vt__row .vt__media {
  transform: translateX(-70px);
}

.vt__row--swap .vt__media {
  transform: translateX(70px);
}

.vt__body {
  transform: translateY(40px);
}

.vt__row--in .vt__media,
.vt__row--in .vt__body {
  opacity: 1;
  transform: translate(0, 0);
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

  /* 移动端时间线恢复全宽单列 */
  .vt {
    max-width: none;
  }

  .vt__row,
  .vt__row--swap {
    grid-template-columns: 28px 1fr;
    margin-bottom: 40px;
  }

  .vt__media {
    display: none;
  }

  .vt__spine {
    grid-row: 1;
    grid-column: 1;
    min-height: 100%;
  }

  .vt__body {
    grid-column: 2;
    padding: 0 0 8px 4px;
  }

  .vt__row--swap .vt__body {
    text-align: left;
  }

  .vt__year {
    font-size: 26px;
  }

  .vt__body h3 {
    font-size: 19px;
  }

  .vt__body p {
    font-size: 14px;
  }
}
</style>
