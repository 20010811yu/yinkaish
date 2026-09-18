import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './assets/styles/main.css'

const app = createApp(App)
app.config.errorHandler = (err, _inst, info) => {
  window.__renderErr = String((err && (err.stack || err.message)) || err) + ' | ' + info
}
app.use(router)
app.use(i18n)
app.mount('#app')
