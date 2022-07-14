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
      tabsList: storage.get('DESIGN_TABSLIST') || [],
    }
  },
  getters: {},
  actions: {
    setTheme(theme) {
      this.theme = theme
      storage.set('DESIGN_THEME', !!theme ? 'darkTheme' : undefined)
    },
    addTabs(info) {
      const item = this.tabsList.find((item) => item.name === info.name) || {}
      if (!Object.keys(item).length) {
        this.tabsList.push(info)
        storage.set('DESIGN_TABSLIST', this.tabsList)
      }
    },
    delTabs(index) {
      this.tabsList.splice(index, 1)
      storage.set('DESIGN_TABSLIST', this.tabsList)
    },
  },
})

export const useDesignStore = () => {
  return defineDesignStore(store)
}
