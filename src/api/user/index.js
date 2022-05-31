import request from '@/lib/request.js'

const login = (data) => {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  })
}

const getUserInfo = (data) => {
  return request({
    url: '/user/getUserInfo',
    method: 'post',
    data,
  })
}

const loginout = () => {
  return request({
    url: '/loginout',
    method: 'post',
  })
}

export default {
  login,
  getUserInfo,
  loginout,
}
