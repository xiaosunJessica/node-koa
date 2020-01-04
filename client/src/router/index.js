import Vue from 'vue';
import Router from 'vue-router';

import Login from '../views/Login';
import Register from '../views/Register';
import Home from '../views/home1';
import Manage from '../views/manage';
import AddProject from '../views/manage/add';
import EditProject from '../views/manage/edit';
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
      path: '/register',
      name: 'Register',
      component: Register
    }, 
    {
      path: '/home',
      name: 'home',
      component: Home
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
				},
				{
					path: 'edit/:id',
					component: EditProject
				}
			]
    },
    {
      path: '/',
      redirect: '/login'
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