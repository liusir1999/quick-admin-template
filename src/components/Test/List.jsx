import { defineComponent } from 'vue'

import ListItem from './Item'

export default defineComponent({
  name: 'List',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const { options, modelValue } = props

    const onCustomClick = (opt, index) => {
      emit(`${opt.field}-click`, opt.value, index)
    }

    const onCustomChange = (val, opt, index) => {
      emit(`${opt.field}-change`, val, opt, index)
    }

    return () => {
      return (
        <div>
          <div className="list">
            {options.map((opt, index) => {
              return (
                <ListItem
                  v-model:value={modelValue[opt.field]}
                  opt={opt}
                  index={index}
                  onCustomClick={onCustomClick}
                  onCustomChange={onCustomChange}
                ></ListItem>
              )
            })}
          </div>
        </div>
      )
    }
  },
})
