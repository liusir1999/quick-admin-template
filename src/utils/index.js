/**
 * @description 工具类
 * @author lyf
 * @date 2022/4/24
 * */

import { NIcon } from 'naive-ui'
import { h } from 'vue'

// 图标渲染
export const renderIcon = (component) => {
  if (!component) return null

  return () => h(NIcon, null, { default: () => h(component) })
}
