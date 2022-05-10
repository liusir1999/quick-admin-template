<script>
import { defineComponent, h, reactive, toRefs } from 'vue'
import { NModal } from 'naive-ui'

export default defineComponent({
  name: 'QuickModal',
  props: {
    ...NModal.props,
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

    return h(NModal, {
      ...props,
      show: this.show,
    })
  },
})
</script>
