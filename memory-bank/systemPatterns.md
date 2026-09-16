# systemPatterns.md — 架构与技术决策

## 架构
Vue 3(`<script setup>`)+ Vite SPA:
- `App.vue` = AppNavbar + AppFooter + `<router-view>`
- 路由:`/`(Home)、`/about`、`/services`、`/team`、`/news`、`/news/:id`、`/careers`、`/contact`;createWebHistory
- i18n:vue-i18n 实例单例,locale 持久化 localStorage(key: `locale`),Element Plus locale 经 computed 跟随
- 数据流:`src/data/index.js` 导出常量数组(services/milestones/team/news/jobs/welfares)→ views/components 只读消费;`src/data/lang.js` 提供 `pick(field, locale)` 取双语字段
- 首页顶部:`components/HeroCarousel.vue`(el-carousel 全宽轮播,slides 数组图片 + i18n key,图片素材在 `src/assets/`)

## 关键技术决策
1. Element Plus 按需引入:unplugin-vue-components + ElementPlusResolver;函数式组件(ElMessage 等)单独引入样式
2. 主题:覆盖 Element Plus CSS 变量(--el-color-primary 系列)于 `assets/styles/main.css`,品牌主色 #00a651 绿色系(呼应公司 logo);禁 `!important` 硬覆盖
3. 样式:design tokens CSS 变量(:root)+ scoped 页面样式;断点 ≤768 / 769–1024 / >1024
4. 双语字段 `{ zh: '', en: '' }`;模板文案全部走 i18n key(`页面.区块.字段`)

## 已知陷阱与规避模式
- (暂无,随 errorlog 沉淀)
