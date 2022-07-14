/**
 * @description desgin stroe
 * @author lyf
 * @date 2022/2/17
 * */
import { defineStore } from 'pinia'
import { createStorage } from '@/lib/storage'
import { store } from '@/store'
import { darkTheme, zhCN, dateZhCN } from 'naive-ui'

const storage = createStorage()

export const defineDesignStore = defineStore({
  id: 'design',
  state: () => {
    return {
      theme: storage.get('DESIGN_THEME') || undefined,
      locale: storage.get('DESIGN_LOCALE') === 'zhCN' ? zhCN : dateZhCN,
    }
  },
  getters: {},
  actions: {
    setTheme(theme) {
      this.theme = theme
      storage.set('DESIGN_THEME', !!theme ? 'darkTheme' : undefined)
    },
  },
})

export const useDesignStore = () => {
  return defineDesignStore(store)
}
