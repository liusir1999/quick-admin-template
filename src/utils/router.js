/**
 * @description 路由加载
 * @author lyf
 * @date 2022/5/20
 * */

const Layout = () => import('@/layout/index.vue')

export const load = (path) => {
  const routeAllPathToCompMap = import.meta.glob(`@/views/**/*.vue`)
  return routeAllPathToCompMap[`../views/${path}.vue`]
}

export const generateRoutes = (data) => {
  const routes = data.reduce((acc, item) => {
    if (item.component === 'Layout') item.component = Layout
    else item.component = load(item.component)

    if (item.children && item.children.length)
      item.children = generateRoutes(item.children)

    acc.push(item)

    return acc
  }, [])

  return routes
}
