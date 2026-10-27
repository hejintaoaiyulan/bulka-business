import { createI18n } from 'vue-i18n'
import zhCN from './zh‑CN'
import en from './en'

// 读取本地缓存语言，默认中文
const locale = uni.getStorageSync('locale') || 'zh-CN'

const messages = {
  'zh-CN': zhCN,
  en
}

const i18n = createI18n({
  legacy: false, // vue3 composition API 必须 false
  locale,
  fallbackLocale: 'zh-CN',
  messages
})
console.log('i18n实例', i18n)
console.log('messages', i18n.global.messages.value)

export default i18n