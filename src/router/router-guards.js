/**
 * @description 路由守卫
 * @author lyf
 * @date 2022/1/10
 * */
import { useUserStore } from '@/store/modules/user'
import { whiteRoutes } from './index'

export const createRouterGuards = (router) => {
  const userStore = useUserStore()
  const isLogin = userStore.isLogin
  const whitePathRoutes = whiteRoutes.map((item) => item.name)

  router.beforeEach((to, from, next) => {
    if (whitePathRoutes.includes(to.name)) {
      next()
      return
    }

    if (!isLogin) {
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
    }

    next()
  })
}
