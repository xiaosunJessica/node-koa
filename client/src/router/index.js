import Vue from 'vue';
import Router from 'vue-router';

import User from '../views/user';
import Login from '../views/Login';
import Home from '../views/Home';


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
      path: '/home',
      name: 'home',
      component: Home
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
      Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + bear;
      next();
    }
  } else {
    next()
  }
})

export default router