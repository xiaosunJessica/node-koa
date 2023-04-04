import { createApp } from 'vue'
import store from '@/stores';
import ElementPlus from "element-plus"
import Common from "./components/common"
import App from './App.vue'
import LesscodeHeader from '@/views/lesscode/header/lesscode-header.vue';
import router from './router'
import auth from '@/common/auth'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import './assets/main.css'
import "element-plus/theme-chalk/index.css"
import "./theme/index.scss";



auth.requestCurrentUser().then(() => {
  const app = createApp(App)

  app.use(store)
  app.use(ElementPlus)
  app.use(Common)
  app.use(router)
  app.component('lesscode-header', LesscodeHeader)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  app.mount('#app')
})
