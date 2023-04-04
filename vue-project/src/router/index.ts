import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Draw from '@/views/draw.vue';
import Lesscode from '@/views/lesscode/index.vue';
import ProjectManage from '@/views/lesscode/project/project-manage/index.vue';
import PageManage from '@/views/lesscode/project/page-manage/index.vue';
import ProjectEntry from '@/views/lesscode/project/entry/index.vue';
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
        { path: 'home', name: 'home', component: ProjectManage },
        {
          path: 'ProjectManage',
          name: 'ProjectManage',
          component: ProjectManage,
        },
        { path: 'marketplace', name: 'marketplace', component: ProjectManage },
        { path: 'op', name: 'op', component: ProjectManage },
        {
            path: 'project/:projectId',
            name: 'project-entry',
            component: ProjectEntry,
            meta: {
              owner: 'projects'
            },
            redirect: { name: 'pageManage'},
            children: [{
              path: 'pageManage',
              name: 'pageManage',
              component: PageManage,
              meta: {
                title: '页面列表'
              }
            }]
         },

      ]
    }
  ]
})

export default router
