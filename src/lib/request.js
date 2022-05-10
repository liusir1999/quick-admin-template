/**
 * @description Axios封装
 * @author lyf
 * @date  2022/1/10
 * */
import axios from 'axios'
import { useMessage } from 'naive-ui'

const service = axios.create({
  baseURL: '/api',
  timeout: 1000,
})

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const { code } = response.data
    const message = useMessage()

    switch (code) {
      case 422:
        message.error(response.data.msg)
        break

      default:
        break
    }

    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
