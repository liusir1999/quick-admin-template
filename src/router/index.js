import { createRouter, createWebHashHistory } from 'vue-router'
import { createRouterGuards } from './router-guards'

const Layout = () => import('@/layout/index.vue')

export const whiteRoutes = [
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    name: 'test',
    path: '/test',
    // component: () => import('@/views/test/index.jsx'),
    component: () => import('@/views/test/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: whiteRoutes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

export const setupRouter = (app) => {
  app.use(router)
  createRouterGuards(router)
}
