import request from '@/lib/request.js'

export const login = (data) => {
  return request({
    url: '/login',
    method: 'post',
    data,
  })
}
