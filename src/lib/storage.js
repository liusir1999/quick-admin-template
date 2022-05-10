/**
 * @description Storage
 * @author lyf
 * @date 2022/1/10
 * */

// 默认缓存期限为7天
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

/**
 * @param {string} prefixKey 前缀
 * @param {object} storage 缓存类型
 * */
export const createStorage = (prefixKey = '', storage = localStorage) => {
  class Stroage {
    storage = storage
    prefixKey = prefixKey

    // 拼接key
    getKey(key) {
      return `${this.prefixKey}${key}`.toUpperCase()
    }

    set(key, value, expire = DEFAULT_CACHE_TIME) {
      const stringData = JSON.stringify({
        value,
        expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
      })

      this.storage.setItem(this.getKey(key), stringData)
    }

    get(key, def = null) {
      const item = this.storage.getItem(this.getKey(key))
      // console.log(item, 'item')

      if (item) {
        try {
          // debugger
          const data = JSON.parse(item)
          // console.log(data, 'data')
          const { value, expire } = data
          // console.log(value, expire)
          if (expire === null || expire >= Date.now()) {
            return value
          }

          this.remove(key)
        } catch (error) {
          console.log(error)
          return def
        }
      }

      return def
    }

    remove(key) {
      this.storage.removeItem(this.getKey(key))
    }

    clear() {
      this.storage.clear()
    }
  }

  return new Stroage()
}
