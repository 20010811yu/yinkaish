<template>
  <header class="navbar" :class="{ 'navbar--scrolled': scrolled }">
    <div class="container navbar__inner">
      <router-link to="/" class="navbar__brand">
        <img src="../assets/favicon.ico" alt="logo" class="navbar__logo-img" />
        <span class="navbar__brand-text">
          <span class="navbar__name">{{ $t('brand.full') }}</span>
          <span class="navbar__name-en">{{ $t('brand.english') }}</span>
        </span>
      </router-link>

      <nav class="navbar__menu" :class="{ 'navbar__menu--open': menuOpen }">
        <router-link
          v-for="item in items"
          :key="item.to"
          :to="item.to"
          class="navbar__link"
          :class="{ 'navbar__link--active': isActive(item.to) }"
          @click="menuOpen = false"
        >
          {{ $t(item.key) }}
        </router-link>
      </nav>

      <div class="navbar__actions">
        <el-button size="small" text @click="toggleLocale">
          {{ locale === 'zh' ? 'EN' : '中文' }}
        </el-button>
        <button class="navbar__burger" aria-label="menu" @click="menuOpen = !menuOpen">
          <span /><span /><span />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const route = useRoute()
const menuOpen = ref(false)
const scrolled = ref(false)

const items = [
  { to: '/', key: 'nav.home' },
  { to: '/services', key: 'nav.services' },
  { to: '/about', key: 'nav.about' },
  { to: '/news', key: 'nav.news' },
  { to: '/careers', key: 'nav.careers' },
  { to: '/contact', key: 'nav.contact' },
]

const isActive = (to) => (to === '/' ? route.path === '/' : route.path.startsWith(to))

const toggleLocale = () => {
  locale.value = locale.value === 'zh' ? 'en' : 'zh'
  localStorage.setItem('locale', locale.value)
}

const onScroll = () => {
  scrolled.value = window.scrollY > 8
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--c-border);
  transition: box-shadow 0.2s;
}

.navbar--scrolled {
  box-shadow: var(--shadow);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 88px;
  max-width: none;
  padding: 0 clamp(16px, 3vw, 40px);
}

.navbar__brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  margin-left: max(0px, calc(100% / 6 - 110px));
}

.navbar__logo-img {
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 10px;
  object-fit: cover;
}

.navbar__brand-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.navbar__name {
  color: var(--c-text);
  font-size: clamp(1rem, 0.5rem + 0.6vw, 1.375rem);
  font-weight: 700;
  letter-spacing: 1px;
  white-space: nowrap;
}

/* 英文全称较长:窄桌面收起品牌区左侧留白,防止菜单溢出 */
@media (max-width: 1439px) {
  .navbar__brand {
    margin-left: 0;
  }

  .navbar__menu {
    margin-left: 12px;
  }
}

.navbar__name-en {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--c-primary);
  letter-spacing: 0.3px;
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.navbar__menu {
  display: flex;
  gap: 2px;
  margin-left: clamp(16px, 5vw, 80px);
  margin-right: auto;
}

.navbar__link {
  padding: 0.625rem 0.625rem;
  border-radius: 8px;
  font-size: 1.0625rem;
  white-space: nowrap;
  color: var(--c-text-secondary);
  transition: color 0.2s, background 0.2s;
}

.navbar__link:hover {
  color: var(--c-primary);
  background: var(--c-primary-light);
}

.navbar__link--active {
  color: var(--c-primary);
  font-weight: 600;
}

.navbar__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.navbar__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
}

.navbar__burger span {
  width: 22px;
  height: 2px;
  background: var(--c-text);
  border-radius: 2px;
}

/* 平板即收起为抽屉菜单:7 个 nowrap 链接 + 长品牌名在 769-1100px 放不下 */
@media (max-width: 1024px) {
  .navbar__menu {
    display: none;
    position: absolute;
    top: 88px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: #fff;
    border-bottom: 1px solid var(--c-border);
    padding: 12px 24px 16px;
    box-shadow: var(--shadow);
  }

  .navbar__menu--open {
    display: flex;
  }

  .navbar__burger {
    display: flex;
  }
}

@media (max-width: 768px) {
  .navbar__name {
    font-size: 1rem;
  }
}
</style>
