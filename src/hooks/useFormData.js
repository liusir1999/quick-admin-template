/**
 * @description useFormData Hook
 * @author lyf
 * @date 2022/1/10
 * */
import { toRefs, isRef } from 'vue'

const useFormData = data => {
  const copyData = toRefs(data)
  const formData = {}

  for (const key in copyData) {
    if (isRef(copyData[key])) {
      formData[key] = copyData[key].value
    }
  }

  return formData
}

export default useFormData
