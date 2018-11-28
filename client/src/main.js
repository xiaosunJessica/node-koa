import Vue from 'vue';
import App from './App.vue';
import router from './router';
import request from './utils/axios';
import moment from 'moment';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.prototype.$http = request;
Vue.prototype.$moment = moment;



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
