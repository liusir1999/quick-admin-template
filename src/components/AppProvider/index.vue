<template>
  <n-loading-bar-provider>
    <n-dialog-provider>
      <DialogContent />
      <n-message-provider>
        <MessageContent />
        <slot slot="default"></slot>
      </n-message-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>

<script>
import { defineComponent } from 'vue'
import MessageContent from '../MessageContent/index.vue'
import DialogContent from '../DialogContent/index.vue'

export default defineComponent({
  nmae: 'AppProvider',
  components: {
    MessageContent,
    DialogContent,
  },
})
</script>
