<template>
  <!-- EP 内置文案(MessageBox 按钮/分页等)跟随站点语言 -->
  <el-config-provider :locale="epLocale">
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
  </el-config-provider>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import AppNavbar from './components/AppNavbar.vue'
import AppFooter from './components/AppFooter.vue'

const route = useRoute()
const { locale } = useI18n()
const isAdmin = computed(() => route.path.startsWith('/admin'))
const epLocale = computed(() => (locale.value === 'en' ? en : zhCn))
</script>
