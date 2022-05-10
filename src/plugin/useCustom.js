/**
 * @description 自定义组件注册
 * @author lyf
 * @date 2022/2/17
 * */
import { oForm } from '@/components/index'

export const useCustom = (app) => {
  const components = [oForm]

  components.forEach((component) => {
    app.component(component.name, component)
  })
}
