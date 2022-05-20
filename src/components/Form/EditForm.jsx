import { NForm } from 'naive-ui'
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'oEditForm',
  props: {
    ...NForm.props,
    options: {
      type: Array,
      default: () => [],
    },
    onCustomChange: {
      type: Function,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    const { options, model, onCustomChange } = props
    // console.log(props, 'props')
    // 默认配置
    const defaultProps = {
      type: 'input',
      show: true,
      clearable: true,
    }

    // 根据类型配置
    const filterByType = (opt) => {
      const condition = {
        input: {
          ...defaultProps,
          ...opt,
        },
        password: {
          ...defaultProps,
          clearable: false,
          showPasswordOn: 'mousedown',
          ...opt,
        },
      }

      return condition[opt.type || 'input']
    }

    // 默认值
    const defaultPlaceholder = (str) => `请输入${str}`

    // 过滤后的配置项
    const filterOptions = computed(() =>
      options.map(filterByType).filter((item) => item.show)
    )

    // Form 组件
    const Form = () => {
      return (
        <div class="o-edit-form">
          {slots.title()}

          <n-form {...props}>
            {filterOptions.value.map((opt, index) => {
              return FormItem(opt, index)
            })}
            {slots.default()}
          </n-form>
        </div>
      )
    }

    // FormItem 组件
    const FormItem = (opt, index) => {
      return (
        <n-form-item key={opt.field + '-' + index} label={opt.label}>
          {/* text */}
          {opt.type === 'text' && <span>{model[opt.field]}</span>}

          {/* input */}
          {['input', 'password'].includes(opt.type) && (
            <n-input
              {...opt}
              v-model:value={model[opt.field]}
              placeholder={opt.placeholder || defaultPlaceholder(opt.label)}
              onChange={(val) => onCustomChange(val, opt)}
            ></n-input>
          )}
        </n-form-item>
      )
    }

    return Form
  },
})
