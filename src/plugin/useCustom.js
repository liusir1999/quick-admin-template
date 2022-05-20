/**
 * @description 自定义组件注册
 * @author lyf
 * @date 2022/2/17
 * */
import { Form } from '@/components/index'

export const useCustom = (app) => {
  const components = [Form]

  components.forEach((component) => {
    app.component(component.name, component)
  })
}
