import { createApp } from 'vue'
import App from './App.vue'
import { useNaive } from './plugin/useNaive'

import { setupRouter } from './router'
import { setupStore } from './store'
import { useCustom } from './plugin/useCustom'

import './assets/scss/index.scss'

import '@/mock'

const bootstrap = () => {
  const app = createApp(App)

  // 注册 naive 组件
  useNaive(app)

  // 注册自定义组件
  useCustom(app)

  // 注册缓存
  setupStore(app)

  // 注册路由
  setupRouter(app)

  app.mount('#app')
}

bootstrap()
