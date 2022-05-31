<template>
  <div class="sider">
    <n-menu
      :options="menuOptions"
      :collapsed="collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="20"
      :mode="mode"
      :indent="24"
      :value="getSelectedKeys"
      :expanded-keys="openKeys"
      @update:value="clickMenuItem"
      @update:expanded-keys="menuExpanded"
    />
  </div>
</template>

<script>
import { defineComponent, toRefs, watch, unref, computed } from 'vue'
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRoutesStore } from '../../store/modules/route'
import { IconsMap } from '@/lib/router-icon'
import { renderIcon } from '@/utils'

export default defineComponent({
  name: 'Menu',
  props: {
    collapsed: {
      type: Boolean,
    },
    mode: {
      type: String,
      default: 'vertical',
    },
    location: {
      type: String,
      default: 'left',
    },
  },
  emits: ['update:collapsed'],
  setup(props, { emit }) {
    const routesStore = useRoutesStore()

    const route = useRoute()
    const router = useRouter()

    // 获取当前打开的子菜单
    const matched = route.matched

    const getOpenKeys =
      matched && matched.length ? matched.map((item) => item.name) : []

    const state = reactive({
      openKeys: getOpenKeys,
    })

    const selectedKeys = ref(route.name)

    const getSelectedKeys = computed(() => {
      return props.location === 'left' ? unref(selectedKeys) : ''
    })

    // 展开菜单
    const menuExpanded = (openKeys) => {
      if (!openKeys) return

      const latestOpenKey = openKeys.find(
        (key) => state.openKeys.indexOf(key) === -1
      )
      const isExistChildren = findChildrenLen(latestOpenKey)

      state.openKeys = isExistChildren
        ? latestOpenKey
          ? [latestOpenKey]
          : []
        : openKeys
    }

    //查找是否存在子路由
    const findChildrenLen = (key) => {
      if (!key) return false
      const subRouteChildren = []
      for (const { children, key } of unref(menuOptions)) {
        if (children && children.length) {
          subRouteChildren.push(key)
        }
      }

      return subRouteChildren.includes(key)
    }

    watch(
      () => route.fullPath,
      () => {
        const activeName = route.meta.activeName || ''
        const matched = route.matched
        state.openKeys = matched.map((item) => item.name)
        selectedKeys.value = activeName ? activeName : route.name
      }
    )

    const clickMenuItem = (key) => {
      if (/http(s)?:/.test(key)) {
        window.open(key)
      } else {
        router.push({ name: key })
      }
      emit('click-menu-item', key)
    }

    const filterOptions = (list) => {
      return list
        .map((item) => {
          const menuItem = {
            ...item,
            label: item?.meta?.title,
            icon: renderIcon(IconsMap[item?.meta?.icon]),
            key: item.name,
          }

          if (item.children && item.children.length) {
            menuItem.children = filterOptions(item.children)
          }

          return menuItem
        })
        .filter((item) => !!item.label)
    }

    const menuOptions = reactive(filterOptions(routesStore.menuList))
    // console.log(menuOptions, 'menuOptions')
    return {
      ...toRefs(state),
      menuOptions,
      getSelectedKeys,
      clickMenuItem,
      menuExpanded,
    }
  },
})
</script>

<style></style>
