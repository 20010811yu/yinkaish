<template>
  <section class="hero-carousel">
    <el-carousel :interval="5000" arrow="hover">
      <el-carousel-item v-for="slide in slides" :key="slide.image">
        <div class="slide" :style="{ backgroundImage: `url(${slide.image})` }">
          <div class="slide__mask" />
          <div class="slide__content container">
            <h2>{{ $t(slide.titleKey) }}</h2>
            <p v-if="slide.subtitleKey">{{ $t(slide.subtitleKey) }}</p>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </section>
</template>

<script setup>
import bannerPv from '../assets/banner-pv.png'
import bannerSunrise from '../assets/banner-sunrise.png'

const slides = [
  { image: bannerSunrise, titleKey: 'home.carousel.s1' },
  { image: bannerPv, titleKey: 'home.carousel.s2' },
]
</script>

<style scoped>
.hero-carousel :deep(.el-carousel__container) {
  height: 520px;
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
  background: linear-gradient(90deg, rgba(6, 44, 24, 0.55) 0%, rgba(6, 44, 24, 0.15) 60%, transparent 100%);
}

.slide__content {
  position: relative;
  width: 100%;
  color: #fff;
}

.slide__content h2 {
  font-size: 46px;
  letter-spacing: 4px;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
  margin-bottom: 14px;
}

.slide__content p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.92);
}

@media (max-width: 768px) {
  .hero-carousel :deep(.el-carousel__container) {
    height: 320px;
  }

  .slide__content h2 {
    font-size: 26px;
    letter-spacing: 2px;
  }

  .slide__content p {
    font-size: 14px;
  }
}
</style>
