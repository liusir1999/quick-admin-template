import { defineComponent, h, reactive, toRefs } from 'vue'
import { NModal } from 'naive-ui'

export default defineComponent({
  name: 'QuickModal',
  props: {
    ...NModal.props,
    component: {
      type: [String, Object],
      default: null,
    },
  },
  mounted() {},
  setup() {
    const state = reactive({
      show: false,
    })

    const handleOpen = () => {
      state.show = true
    }

    return {
      ...toRefs(state),
      handleOpen,
    }
  },
  render(props) {
    // console.log(props, 'props')
    const { component } = props

    // const renderHeader = () => [
    //   h('strong', {slot: 'header'}, props.title)
    // ]

    const renderContent = () => {
      console.log(component, 'component')
      if (!component) return '暂无数据'

      return component
    }

    const renderAction = () => {}

    const renderIcon = () => {}

    return h(
      <NModal {...props} v-model:show={this.show}>
        {renderContent()}
      </NModal>
    )
  },
})
