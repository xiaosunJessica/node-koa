import Vue from 'vue';
import Router from 'vue-router';

import User from '../views/user';
import Login from '../views/Login';


Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [
     {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const bear = window.localStorage.getItem('bear');
    if (!bear) {
      next('/login')
    } else {
      Vue.prototype.$http.detaults.headers.common['Authorization'] = 'Bearer ' + bear
    }
  } else {
    next()
  }
})

export default router