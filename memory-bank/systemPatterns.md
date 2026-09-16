# systemPatterns.md — 架构与技术决策

## 架构
Vue 3(`<script setup>`)+ Vite SPA:
- `App.vue` = Navbar + Footer + `<router-view>`
- 路由:`/`(Home)、`/about`、`/services`、`/team`、`/news`、`/news/:id`、`/careers`、`/contact`;createWebHistory
- i18n:vue-i18n 实例单例,locale 持久化 localStorage(key: `locale`),Element Plus locale 经 computed 跟随
- 数据流:`src/data/*.js` 导出常量数组 → views/components 只读消费

## 关键技术决策
1. Element Plus 按需引入:unplugin-vue-components + ElementPlusResolver;函数式组件(ElMessage 等)单独引入样式
2. 主题:覆盖 Element Plus CSS 变量(--el-color-primary 系列)于全局样式,品牌主色蓝色系;禁 `!important` 硬覆盖
3. 样式:design tokens CSS 变量(:root)+ scoped 页面样式;断点 ≤768 / 769–1024 / >1024
4. 双语字段 `{ zh: '', en: '' }`,提供 `t` 辅助按当前 locale 取值

## 已知陷阱与规避模式
- (暂无,随 errorlog 沉淀)
