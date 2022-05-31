/**
 * @description routes stores
 * @author lyf
 * @date 2022/5/12
 * */
import { defineStore } from 'pinia'
import { createStorage } from '@/lib/storage'
import { store } from '@/store'
import { generateRoutes } from '@/utils/router'

const storage = createStorage()

export const defineRoutesStore = defineStore({
  id: 'routes',
  state: () => {
    return {
      isAddedDynamicRoutes: false,
      routes: [],
    }
  },
  getters: {
    getIsDynamicAddedRoute() {
      return this.isAddedDynamicRoutes
    },
    menuList() {
      return this.routes
    },
  },
  actions: {
    setRoutes(routes) {
      this.routes = routes
    },
    setIsAddedDynamicRoutes(flag) {
      this.isAddedDynamicRoutes = flag
    },
    generateRoutes(data) {
      const asyncRoutes = generateRoutes(data)
      this.setRoutes(asyncRoutes)
      return asyncRoutes
    },
  },
})

export const useRoutesStore = () => {
  return defineRoutesStore(store)
}
