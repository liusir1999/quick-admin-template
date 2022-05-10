import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Son',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  setup(props, { emit }) {
    const { value } = props

    const onClick = () => emit('on-custom-click', 'Son组件传递的参数')

    return () => {
      return (
        <div>
          <div>Son 组件</div>

          <div>Child 传递过来的数据：{value}</div>

          <button onClick={onClick}>点击</button>
        </div>
      )
    }
  },
})
