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
      component: User
    }
  ]
})

export default router