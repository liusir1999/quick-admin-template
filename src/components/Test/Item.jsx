import { computed, defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  name: 'ListItem',
  props: {
    opt: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      default: 0,
    },
    onCustomClick: {
      type: Function,
      default: () => ({}),
    },
    onCustomChange: {
      type: Function,
      default: () => ({}),
    },
    value: {
      type: [String, Number],
      default: '',
    },
  },
  setup(props) {
    const { opt, index, onCustomClick, onCustomChange, value } = props

    const msg = reactive(value)

    const listItem = (opt, index) => {
      return (
        <div>
          <div>
            <span style={{ marginRight: '10px' }}>
              {index}：{opt.title}-{opt.value}
            </span>

            <button onClick={() => onCustomClick(opt, index)}>点击</button>
          </div>

          <input
            type="text"
            value={msg}
            onChange={(e) => onCustomChange(e.target.value, opt, index)}
          />
        </div>
      )
    }

    return () => {
      return listItem(opt, index)
    }
  },
})
