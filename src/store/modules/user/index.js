/**
 * @description user stroe
 * @author lyf
 * @date 2022/1/10
 * */
import { defineStore } from 'pinia'
import { createStorage } from '@/lib/storage'
import { store } from '@/store'
import { useRequest } from '@/hooks/useHooks'

const storage = createStorage()
const { login, getUserInfo, loginout } = useRequest('user')

export const defineUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      token: storage.get('token'),
      userInfo: storage.get('userInfo'),
      menuList: storage.get('menuList'),
    }
  },
  getters: {
    isLogin: (state) => !!state.token,
  },
  actions: {
    setDataByKey(key, value) {
      this[key] = value
      value && storage.set(key, value)
      !value && storage.remove(key)
    },
    // 登录
    async login(data) {
      try {
        const res = await login(data)

        if (res.code === 200) {
          this.setDataByKey('token', res.result)
        }

        return res
      } catch (error) {
        // console.log(error)
        this.setDataByKey('token', '')
        return error
      }
    },
    // 获取用户信息
    async getUserInfo() {
      try {
        const res = await getUserInfo()

        if (res.code === 200) {
          this.setDataByKey('userInfo', res.result.userInfo)
          this.setDataByKey('menuList', res.result.menuList)
        }
        return res.result
      } catch (error) {
        return error
      }
    },
    // 推出
    async loginout() {
      try {
        const res = await loginout()

        if (res.code === 200) {
          return res
        }

        this.setDataByKey('token', '')
        this.setDataByKey('userInfo', '')
        this.setDataByKey('menuList', '')
      } catch (error) {
        this.setDataByKey('token', '')
        this.setDataByKey('userInfo', '')
        this.setDataByKey('menuList', '')
      }
    },
  },
})

export const useUserStore = () => {
  return defineUserStore(store)
}
