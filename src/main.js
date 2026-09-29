import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import { hydrateAll } from './api/data'
import './assets/styles/main.css'

// 动态内容(新闻/职位/产品/荣誉/伙伴)从后端拉取,失败保持静态兜底
hydrateAll()

const app = createApp(App)
app.config.errorHandler = (err, _inst, info) => {
  window.__renderErr = String((err && (err.stack || err.message)) || err) + ' | ' + info
}
app.use(router)
app.use(i18n)
app.mount('#app')
