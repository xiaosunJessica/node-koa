import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from './router'
import Common from "./components/common";

import 'element-plus/theme-chalk/index.css';
import './assets/main.css'
import './theme/index.scss'

const app = createApp(App)

app.use(ElementPlus)
app.use(Common)
app.use(router)

app.mount('#app')
