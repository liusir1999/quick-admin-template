/**
 * @description 路由守卫
 * @author lyf
 * @date 2022/1/10
 * */
import { whiteRoutes } from './index'
import { createStorage } from '../lib/storage'
import { defineUserStore } from '../store/modules/user'
import { defineRoutesStore } from '../store/modules/route'
import { ErrorRoute } from './index'

const storage = createStorage()

export const createRouterGuards = (router) => {
  const whitePathRoutes = whiteRoutes.map((item) => item.name)

  router.beforeEach(async (to, from, next) => {
    const Loading = window['$loading'] || null
    Loading && Loading.start()

    const token = storage.get('token')
    if (!token) {
      if (whitePathRoutes.includes(to.name)) {
        next()
        return
      }

      if (to.meta.ignoreAuth) {
        next()
        return
      }

      const redirectData = {
        path: '/login',
        replace: true,
      }

      if (to.name !== 'login') {
        redirectData.query = {
          redirect: to.path,
        }
      }
      next(redirectData)
      return
    } else {
      const routesStore = defineRoutesStore()
      const userStore = defineUserStore()

      if (routesStore.isAddedDynamicRoutes) {
        next()
        return
      }

      const userInfo = await userStore.getUserInfo()
      const routes = routesStore.generateRoutes(userInfo.menuList)

      routes.forEach((route) => {
        router.addRoute(route)
      })

      // routesStore.generateRoutes(routes)
      routesStore.setIsAddedDynamicRoutes(true)

      const isErrorPage = router
        .getRoutes()
        .findIndex((item) => item.name === ErrorRoute.name)

      if (isErrorPage === -1) {
        router.addRoute(ErrorRoute)
      }

      if (to.name === 'login') next({ name: 'dashboard' })
      next(to)
      Loading && Loading.finish()
    }
  })

  router.afterEach((to) => {
    const Loading = window['$loading'] || null
    Loading && Loading.finish()
  })
}
