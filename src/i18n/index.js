import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

const saved = localStorage.getItem('locale')
const i18n = createI18n({
  legacy: false,
  locale: saved === 'en' ? 'en' : 'zh',
  fallbackLocale: 'zh',
  messages: { zh, en },
})

export default i18n
