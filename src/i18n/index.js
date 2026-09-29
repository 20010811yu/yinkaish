import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'
import { adminZh } from './zh'
import { adminEn } from './en'

const saved = localStorage.getItem('locale')
const i18n = createI18n({
  legacy: false,
  locale: saved === 'en' ? 'en' : 'zh',
  fallbackLocale: 'zh',
  messages: {
    zh: { ...zh, ...adminZh },
    en: { ...en, ...adminEn },
  },
})

export default i18n
