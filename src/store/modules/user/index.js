/**
 * @description user stroe
 * @author lyf
 * @date 2022/1/10
 * */
import { defineStore } from 'pinia'
import { createStorage } from '@/lib/storage'
import { store } from '@/store'

const storage = createStorage()

export const defineUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      token: storage.get('token'),
      userInfo: storage.get('userInfo'),
    }
  },
  getters: {
    isLogin: (state) => !!state.token,
  },
})

export const useUserStore = () => {
  return defineUserStore(store)
}
