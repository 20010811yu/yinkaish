<template>
  <header class="navbar" :class="{ 'navbar--scrolled': scrolled }">
    <div class="container navbar__inner">
      <router-link to="/" class="navbar__brand">
        <img src="../assets/logo.png" alt="logo" class="navbar__logo-img" />
        <span class="navbar__name">{{ $t('brand.short') }}</span>
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
  { to: '/about', key: 'nav.about' },
  { to: '/services', key: 'nav.services' },
  { to: '/team', key: 'nav.team' },
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
  height: 64px;
}

.navbar__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
}

.navbar__logo-img {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  object-fit: cover;
}

.navbar__name {
  color: var(--c-text);
  font-size: 17px;
}

.navbar__menu {
  display: flex;
  gap: 4px;
}

.navbar__link {
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 15px;
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
  background: var(--c-primary-light);
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

@media (max-width: 768px) {
  .navbar__menu {
    display: none;
    position: absolute;
    top: 64px;
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
</style>
