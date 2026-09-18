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
        <div class="profile">
          <div class="profile__side">
            <span class="section-tag">PROFILE</span>
            <h2 class="section-title">{{ $t('about.profileTitle') }}</h2>
            <p class="profile__lead">{{ $t('about.profileLead') }}</p>
          </div>
          <div class="profile__body">
            <div v-for="(p, i) in intro" :key="i" class="profile__item">
              <h3>{{ pick(p.title, locale) }}</h3>
              <p>{{ pick(p.text, locale) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container">
        <div class="section-head">
          <h2 class="section-title">{{ $t('about.videoTitle') }}</h2>
        </div>
        <div class="video-wrap">
          <video controls preload="metadata" :src="videoUrl" class="video-player"></video>
        </div>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container">
        <div class="section-head">
          <h2 class="section-title">{{ $t('about.mvvTitle') }}</h2>
        </div>
        <div class="mvv">
          <div v-for="m in mvv" :key="m.icon" class="mvv__item">
            <el-icon :size="32" color="var(--c-primary)"><component :is="m.icon" /></el-icon>
            <h3>{{ $t(`about.${m.key}.title`) }}</h3>
            <p>{{ $t(`about.${m.key}.desc`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <h2 class="section-title">{{ $t('about.honorsTitle') }}</h2>
          <p class="section-subtitle">{{ $t('about.honorsSubtitle') }}</p>
        </div>
        <div class="gallery">
          <div class="gallery__viewer">
            <transition name="fade" mode="out-in">
              <img :key="active" :src="honors[active].image" :alt="pick(honors[active].name, locale)" class="gallery__img" />
            </transition>
            <button class="gallery__arrow gallery__arrow--left" aria-label="prev" @click="step(-1)">‹</button>
            <button class="gallery__arrow gallery__arrow--right" aria-label="next" @click="step(1)">›</button>
            <span class="gallery__counter">{{ active + 1 }} / {{ honors.length }}</span>
          </div>
          <div class="gallery__side">
            <div class="gallery__info">
              <h3>{{ pick(honors[active].name, locale) }}</h3>
              <p>{{ pick(honors[active].desc, locale) }}</p>
            </div>
            <div class="gallery__thumbs">
              <button
                v-for="(h, i) in honors"
                :key="h.image"
                class="gallery__thumb"
                :class="{ 'gallery__thumb--active': i === active }"
                @click="active = i"
              >
                <img :src="h.image" :alt="pick(h.name, locale)" loading="lazy" />
              </button>
            </div>
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
import { timeline, intro, honors } from '../data'
import { pick } from '../data/lang'
import videoUrl from '../assets/video/introduce.mp4'

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

// 荣誉相册当前索引
const active = ref(0)
const step = (dir) => {
  active.value = (active.value + dir + honors.length) % honors.length
}

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

/* 公司简介区块 */
.profile {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 56px;
  align-items: start;
}

.profile__side {
  position: sticky;
  top: 120px;
}

.profile__lead {
  margin-top: 12px;
  font-size: 17px;
  color: var(--c-text-secondary);
}

.profile__body {
  display: grid;
  gap: 28px;
}

.profile__item {
  background: var(--c-bg-soft);
  border-left: 4px solid var(--c-primary);
  border-radius: var(--radius);
  padding: 24px 28px;
}

.profile__item h3 {
  font-size: 19px;
  color: var(--c-primary);
  margin-bottom: 10px;
}

.profile__item p {
  font-size: 15px;
  line-height: 1.9;
  color: var(--c-text);
}

/* 公司宣传片 */
.video-wrap {
  max-width: 900px;
  margin: 0 auto;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
}

.video-player {
  width: 100%;
  aspect-ratio: 16 / 9;
  display: block;
  background: #000;
}

/* 公司荣誉:相册式布局 */
.gallery {
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 190px;
  gap: 24px;
  align-items: start;
}

.gallery__side {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.gallery__viewer {
  position: relative;
  background: #fff;
  border: 1px solid var(--c-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.gallery__img {
  width: 100%;
  height: 560px;
  object-fit: contain;
  background: #fff;
  display: block;
}

.gallery__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: var(--c-primary);
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: background 0.2s;
}

.gallery__arrow:hover {
  background: var(--c-primary-light);
}

.gallery__arrow--left {
  left: 14px;
}

.gallery__arrow--right {
  right: 14px;
}

.gallery__counter {
  position: absolute;
  right: 16px;
  bottom: 12px;
  font-size: 13px;
  color: var(--c-text-secondary);
  background: rgba(255, 255, 255, 0.9);
  border-radius: 999px;
  padding: 2px 12px;
}

.gallery__info {
  text-align: center;
  margin-top: 16px;
}

.gallery__info h3 {
  font-size: 20px;
  margin-bottom: 6px;
}

.gallery__info p {
  font-size: 14px;
  color: var(--c-text-secondary);
}

.gallery__thumbs {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-height: 470px;
  overflow-y: auto;
  padding-right: 4px;
}

.gallery__thumb {
  border: 2px solid var(--c-border);
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  cursor: pointer;
  padding: 0;
  transition: border-color 0.2s, transform 0.2s;
}

.gallery__thumb img {
  width: 100%;
  height: 74px;
  object-fit: cover;
  display: block;
}

.gallery__thumb--active {
  border-color: var(--c-primary);
  transform: scale(1.03);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
  order: 3;
}

.vt__row--swap .vt__spine {
  order: 2;
}

.vt__row--swap .vt__body {
  order: 1;
  text-align: right;
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

@media (max-width: 1024px) {
  .gallery {
    grid-template-columns: 1fr;
  }

  .gallery__side {
    order: 2;
  }

  .gallery__thumbs {
    flex-direction: row;
    max-height: none;
    overflow-x: auto;
  }

  .gallery__thumb {
    flex-shrink: 0;
    width: 90px;
  }

  .gallery__thumb img {
    height: 64px;
  }
}

@media (max-width: 768px) {
  .gallery__img {
    height: 340px;
    object-fit: cover;
  }

  .mvv {
    grid-template-columns: 1fr;
  }

  .profile {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .profile__side {
    position: static;
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
