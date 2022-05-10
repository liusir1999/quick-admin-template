import { NForm } from 'naive-ui'
import { defineComponent } from 'vue'

// components
import oEditForm from './oEditForm'
import oDetailForm from './oDetailForm.vue'

export default defineComponent({
  name: 'oForm',
  props: {
    ...NForm.props,
    options: {
      type: Array,
      default: () => [],
    },
    isDetail: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    oDetailForm,
    oEditForm,
  },
  setup(props, { slots, emit }) {
    const { isDetail } = props

    // 自定义事件
    const onCustomChange = (val, opt) => {
      emit(`on-${opt.field}-change`, val)
    }

    return () => {
      return (
        <div class="o-form">
          {!isDetail && (
            <oEditForm
              {...props}
              v-slots={{
                // 默认插槽
                default: () => slots.default(),
                // title 具名插槽
                title: () => slots.title(),
              }}
              onCustomChange={onCustomChange}
            />
          )}

          {isDetail && <oDetailForm {...props} />}
        </div>
      )
    }
  },
})
