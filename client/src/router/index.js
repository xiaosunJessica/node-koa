import Vue from 'vue';
import Router from 'vue-router';

import User from '../views/user';
import Login from '../views/Login';
import Home from '../views/Home';
import Manage from '../views/manage';
import AddProject from '../views/manage/add';
import ListProject from '../views/manage/list';


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
    },
    {
      path: '/manage',
      name: 'Manage',
      component: Manage,
			meta: { requiresAuth: true },
			children: [
				{
					path: 'add',
					component: AddProject,
				},
				{
					path: 'list',
					component: ListProject,
				}
			]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
		const bear = window.localStorage.getItem('bear');
    if (!bear || bear === 'undefined') {
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