import { createApp } from 'vue'
import store from '@/stores';
import ElementPlus from "element-plus"
import Common from "./components/common"
import App from './App.vue'
import LesscodeHeader from '@/views/lesscode/header/lesscode-header.vue';
import router from './router'
import auth from '@/common/auth'

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



  app.mount('#app')
})
