import { createRouter, createWebHashHistory } from 'vue-router'
import { createRouterGuards } from './router-guards'

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

const Layout = () => import('@/layout/index.vue')

export const ErrorRoute = {
  name: 'ErrorPage',
  path: '/:path(.*)*',
  component: Layout,
  children: [
    {
      name: 'ErrorPage',
      path: '/:path(.*)*',
      component: () => import('@/views/exception/404.vue'),
    },
  ],
}

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

export default router
