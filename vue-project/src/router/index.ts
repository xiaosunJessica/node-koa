import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Draw from '@/views/draw.vue';
import Lesscode from '@/views/lesscode/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/draw',
      name: 'draw',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Draw
    },
    {
      path: '/lesscode',
      name: 'lesscode',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Lesscode,
      children: [
        { path: '/home', name: '产品介绍', component: Draw },
        { path: '/project', name: '应用开发', component: Draw },
        { path: '/marketplace', name: '资源市场', component: Draw },
        { path: '/op', name: '运营数据', component: Draw },
      ]
    }
  ]
})

export default router
