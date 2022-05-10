<template>
  <n-config-provider :theme="theme">
    <RouterView />
  </n-config-provider>
</template>

<script>
import { defineComponent, toRefs } from 'vue'

import { useDesignStore } from '@/store/modules/design'

export default defineComponent({
  setup() {
    const designStore = useDesignStore()

    const { theme } = toRefs(designStore)

    return {
      designStore,
      theme,
    }
  },
})
</script>
