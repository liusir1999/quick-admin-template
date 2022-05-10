<template>
  <div>
    <n-button type="primary" @click="onClick">open Dialog</n-button>

    <!-- <QuickModal
      title="确认"
      content="你确认?"
      positive-text="确认"
      negative-text="算了"
    ></QuickModal> -->

    <!-- <n-modal
      v-model:show="show"
      preset="dialog"
      title="确认"
      content="你确认?"
      positive-text="确认"
      negative-text="算了"
    ></n-modal> -->
  </div>
</template>

<script>
import { reactive, ref, getCurrentInstance } from 'vue'
// import QuickModal from '../../components/dialog/index.jsx'

import { QuickModal } from '../../components/dialog/index.js'

export default {
  // components: { QuickModal },
  name: 'test',
  setup() {
    const show = ref(false)

    const onClick = () => {
      // show.value = true
      QuickModal({
        preset: 'dialog',
        title: '测试标题',
        content: '测试内容',
      })
    }

    return {
      onClick,
      show,
    }
  },
}
</script>

<style></style>
