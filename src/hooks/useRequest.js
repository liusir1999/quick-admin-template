/**
 * @description Api 动态引入
 * @author lyf
 * @date 2022/1/10
 * */
import login from '../api/user'

export default moduleName => {
  const files = import.meta.globEager(`../api/*/*js`)

  const modules = {}

  Object.keys(files).forEach(file => {
    if (file.includes(moduleName)) {
      modules[moduleName] = files[file].default
    }
  })
  return modules[moduleName]
}
