import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Draw from '@/views/draw.vue';
import Lesscode from '@/views/lesscode/index.vue';
import Projects from '@/views/lesscode/project/project-manage/index.vue';

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
      // redirect: { name: 'projects'},
      children: [
        { path: 'home', name: 'home', component: Projects },
        {
          path: 'projects',
          name: 'projects',
          component: Projects,
        },
        { path: 'marketplace', name: 'marketplace', component: Projects },
        { path: 'op', name: 'op', component: Projects },
      ]
    }
  ]
})

export default router
