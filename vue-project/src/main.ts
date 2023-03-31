import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from "element-plus"
import Common from "./components/common"
import App from './App.vue'
import router from './router'

import './assets/main.css'
import "element-plus/theme-chalk/index.css"
import "./theme/index.scss";

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
app.use(Common)
app.use(router)

app.mount('#app')
