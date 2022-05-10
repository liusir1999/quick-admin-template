import { defineComponent, ref, reactive } from 'vue'

import Demo from '../../components/Test/demo.vue'
import List from '../../components/Test/List'

import QuickModal from '../../components/dialog/index.jsx'

export default defineComponent({
  name: 'Test',
  components: {
    Demo,
    List,
    QuickModal,
  },
  setup() {
    const msg = ref('测试数据')

    const options = reactive([
      {
        title: '姓名',
        value: 'LiuYiFan',
        field: 'name',
      },
      {
        title: '性别',
        value: '男',
        field: 'sex',
      },
    ])

    const model = reactive({
      name: 'LiuYiFan',
      sex: '男',
    })

    const onNameClick = (val, index) => {
      console.log(val, index)
    }

    const onNameChange = (val, opt, index) => {
      console.log(val, opt, index, 'change')
    }

    const show = ref(false)

    const onClick = () => {
      show.value = true
    }

    return {
      model,
      msg,
      show,
      options,
      onNameClick,
      onNameChange,
      onClick,
    }
  },
  render() {
    return (
      <div>
        Test
        {/* <List
          v-model={this.model}
          options={this.options}
          onNameClick={this.onNameClick}
          onNameChange={this.onNameChange}
        ></List> */}
        <br />
        <n-button type="primary" onClick={() => this.onClick()}>
          Open Modal
        </n-button>
        <QuickModal
          v-model:show={this.show}
          preset="dialog"
          title="确认"
          content="你确认?"
          positive-text="确认"
          negative-text="算了"
        >
          123
        </QuickModal>
      </div>
    )
  },
})
