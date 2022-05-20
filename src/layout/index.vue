<template>
  <n-layout class="layout" has-sider>
    <n-layout-sider bordered :native-scrollbar="false">
      <Logo />
      <Sider />
    </n-layout-sider>

    <n-layout>
      <n-layout-header>
        <PageHeader />
      </n-layout-header>

      <n-layout-content>
        <RouterView />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup>
import Logo from './components/Logo.vue'
import Sider from './components/Sider.vue'
import PageHeader from './components/Header.vue'

import { useLoadingBar } from 'naive-ui'
import { onMounted } from 'vue'

onMounted(() => {
  window['$loading'] = useLoadingBar()
  window['$loading'].finish()
})
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: row;
  flex: auto;
  height: 100%;
}
</style>
