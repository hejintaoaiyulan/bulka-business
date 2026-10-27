import App from './App'
import { createPinia } from "pinia";

const pinia = createPinia()

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App,
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import i18n from './lang'
import { $t, $te, $d } from './i18n-helper'

export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia)
  app.use(i18n)
  app.config.globalProperties.$t = $t
  app.config.globalProperties.$te = $te
  app.config.globalProperties.$d = $d
  return {
    app
  }
}
// #endif