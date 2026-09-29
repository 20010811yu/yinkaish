<template>
  <div class="app">
    <!-- 管理端(/admin)使用自己的布局,不显示官网导航与页脚 -->
    <template v-if="!isAdmin">
      <AppNavbar />
    </template>
    <router-view />
    <template v-if="!isAdmin">
      <AppFooter />
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'
import AppFooter from './components/AppFooter.vue'

const route = useRoute()
const isAdmin = computed(() => route.path.startsWith('/admin'))
</script>
