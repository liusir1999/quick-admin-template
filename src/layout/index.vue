<template>
  <n-layout class="layout" has-sider>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
    >
      <Logo />
      <Menu :collapsed="collapsed" />
    </n-layout-sider>

    <n-layout>
      <n-layout-header>
        <PageHeader v-model:collapsed="collapsed" />
      </n-layout-header>

      <n-layout-content>
        <TagViews />
        <div class="main">
          <RouterView />
        </div>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script>
import Logo from './components/Logo.vue'
import Menu from './components/Menu.vue'
import PageHeader from './components/Header.vue'
import TagViews from './components/TagViews.vue'

import { useLoadingBar } from 'naive-ui'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'Layout',
  components: {
    Logo,
    Menu,
    PageHeader,
    TagViews,
  },
  setup() {
    onMounted(() => {
      window['$loading'] = useLoadingBar()
      window['$loading'].finish()
    })

    const collapsed = ref(false)

    return {
      collapsed,
    }
  },
})
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: row;
  flex: auto;
  height: 100%;
}
</style>
