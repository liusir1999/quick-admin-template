<template>
  <n-config-provider :theme="computedConfig">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </n-config-provider>
</template>

<script>
import { defineComponent, reactive, toRefs, computed } from 'vue'

import { useDesignStore } from '@/store/modules/design'
import { darkTheme } from 'naive-ui'

import AppProvider from '@/components/AppProvider/index.vue'

export default defineComponent({
  components: {
    AppProvider,
  },
  setup() {
    const designStore = useDesignStore()

    const config = reactive({
      theme: toRefs(designStore).theme,
    })

    const computedConfig = computed(() => {
      return config.theme === 'darkTheme' ? darkTheme : undefined
    })

    return {
      designStore,
      computedConfig,
      ...toRefs(config),
    }
  },
})
</script>
