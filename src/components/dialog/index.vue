<script>
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
    console.log(NModal)
    const renderContent = () => {
      return [h('div', {}, props.component)]
    }

    return h(
      NModal,
      {
        ...props,
        show: this.show,
      },
      [renderContent()]
    )
  },
})
</script>
