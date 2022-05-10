<template>
  <input type="text" v-model="msg" />
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'Demo',
  props: {
    value: String,
  },
  setup(props, { emit }) {
    const msg = computed({
      get: () => {
        return props.value
      },
      set: (value) => {
        emit('update:value', value)
      },
    })

    return {
      msg,
    }
  },
})
</script>

<style></style>
