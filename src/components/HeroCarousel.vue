<template>
  <section class="hero-carousel">
    <el-carousel :interval="5000" arrow="hover">
      <el-carousel-item v-for="slide in slides" :key="slide.image">
        <div class="slide" :style="{ backgroundImage: `url(${slide.image})` }">
          <div class="slide__mask" />
          <div class="slide__content container">
            <div class="slide__title-row">
              <span class="slide__bar" />
              <h2 class="slide__title">{{ $t(slide.titleKey) }}</h2>
            </div>
            <p v-if="slide.subtitleKey" class="slide__subtitle">{{ $t(slide.subtitleKey) }}</p>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </section>
</template>

<script setup>
import bannerHome from '../assets/banner-home.jpg'
import bannerPv from '../assets/banner-pv.png'
import bannerVision from '../assets/banner-vision.png'
import bannerCooperation from '../assets/banner-cooperation.jpg'

const slides = [
  { image: bannerHome, titleKey: 'home.carousel.s1' },
  { image: bannerPv, titleKey: 'home.carousel.s2', subtitleKey: 'home.carousel.s2sub' },
  { image: bannerVision, titleKey: 'home.carousel.s3', subtitleKey: 'home.carousel.s3sub' },
  { image: bannerCooperation, titleKey: 'home.carousel.s4', subtitleKey: 'home.carousel.s4sub' },
]
</script>

<style scoped>
.hero-carousel :deep(.el-carousel__container) {
  height: clamp(480px, 55vw, 780px);
}

.slide {
  position: relative;
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
}

.slide__mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(75deg, rgba(4, 32, 18, 0.78) 0%, rgba(4, 32, 18, 0.35) 45%, transparent 75%);
}

.slide__content {
  position: relative;
  width: 100%;
  color: #fff;
}

.slide__title-row {
  display: flex;
  align-items: stretch;
  gap: 22px;
  animation: rise 0.7s ease both;
}

.slide__bar {
  width: 8px;
  border-radius: 4px;
  background: linear-gradient(180deg, #7fe3ae 0%, #00a651 100%);
  box-shadow: 0 0 18px rgba(0, 166, 81, 0.8);
}

.slide__title {
  font-family: 'HarmonyOS Sans SC', 'Source Han Sans SC', 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', 'Segoe UI', 'Helvetica Neue', sans-serif;
  font-size: clamp(1.75rem, 1.4rem + 2.6vw, 3.5rem);
  font-weight: 900;
  letter-spacing: 3px;
  line-height: 1.2;
  background: linear-gradient(105deg, #ffffff 45%, #c8f7dd 72%, #6ee7a8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  /* 多层光影:内亮绿光晕 + 外扩散绿光 + 深色投影立体感 */
  filter: drop-shadow(0 0 12px rgba(110, 231, 168, 0.6)) drop-shadow(0 0 34px rgba(0, 166, 81, 0.5)) drop-shadow(0 3px 8px rgba(0, 20, 10, 0.5));
}

.slide__subtitle {
  margin-top: 18px;
  padding-left: 30px;
  font-size: 1.75rem;
  font-weight: 300;
  letter-spacing: 6px;
  color: rgba(255, 255, 255, 0.92);
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.35);
  position: relative;
  animation: rise 0.7s 0.2s ease both;
}

.slide__subtitle::before {
  content: '';
  position: absolute;
  top: -12px;
  left: 30px;
  width: clamp(120px, 30vw, 220px);
  height: 2px;
  background: linear-gradient(90deg, #00a651, transparent);
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(26px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .slide__title {
    letter-spacing: 2px;
  }

  .slide__bar {
    width: 5px;
  }

  .slide__title-row {
    gap: 12px;
  }

  .slide__subtitle {
    font-size: 17px;
    letter-spacing: 3px;
    padding-left: 17px;
  }

  .slide__subtitle::before {
    left: 17px;
  }
}
</style>
