<template>
  <div class="page-header flex-space-between">
    <!-- left -->
    <div class="page-header-left flex">
      <!-- 收起/打开 菜单 -->
      <div
        class="page-header-trigger page-header-trigger-min"
        @click="() => $emit('update:collapsed', !collapsed)"
      >
        <n-icon size="22" v-if="collapsed">
          <MenuUnfoldOutlined />
        </n-icon>
        <n-icon size="22" v-else>
          <MenuFoldOutlined />
        </n-icon>
      </div>

      <!-- 刷新 -->
      <div
        class="page-header-trigger page-header-trigger-min"
        @click="onRefresh"
      >
        <n-icon size="22">
          <ReloadOutlined />
        </n-icon>
      </div>

      <!-- 面包屑 -->
      <n-breadcrumb>
        <template v-for="item in breadcrumbList">
          <n-breadcrumb-item
            v-if="item.children && item.children.length"
            :key="item.key"
          >
            <n-dropdown :options="item.children" @select="dropdownSelect">
              <span class="link-text">{{ item.label }}</span>
            </n-dropdown>
          </n-breadcrumb-item>

          <n-breadcrumb-item v-else :key="item.key">
            <n-dropdown class="link-text">
              <span class="link-text">{{ item.label }}</span>
            </n-dropdown>
          </n-breadcrumb-item>
        </template>
      </n-breadcrumb>
    </div>

    <!-- right -->
    <div class="page-header-right flex">
      <template v-for="item in iconsList" :key="item.name">
        <div class="page-header-trigger page-header-trigger-min">
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-icon size="22">
                <component
                  :is="item.name"
                  v-on="item.eventObject || {}"
                ></component>
              </n-icon>
            </template>
            <span>{{ item.tips }}</span>
          </n-tooltip>
        </div>
      </template>
    </div>

    <!-- 搜索栏 -->
    <Search v-model:show="searchFlag" />
  </div>
</template>

<script>
import { computed, defineComponent, unref, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { IconsMap } from '../../lib/router-icon'
import Search from './Search.vue'

export default defineComponent({
  name: 'PageHeader',
  props: {
    collapsed: {
      type: Boolean,
    },
  },
  components: {
    Search,
    MenuUnfoldOutlined: IconsMap['MenuUnfoldOutlined'],
    MenuFoldOutlined: IconsMap['MenuFoldOutlined'],
    ReloadOutlined: IconsMap['ReloadOutlined'],
    SearchOutlined: IconsMap['SearchOutlined'],
    GithubFilled: IconsMap['GithubFilled'],
    LockOutlined: IconsMap['LockOutlined'],
    SettingOutlined: IconsMap['SettingOutlined'],
    FullscreenOutlined: IconsMap['FullscreenOutlined'],
    FullscreenExitOutlined: IconsMap['FullscreenExitOutlined'],
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()

    const generator = (list = []) => {
      return list.map((item) => {
        const currentMenu = {
          label: item?.meta?.title,
          key: item.name,
          disabled: item.path === '/',
        }

        if (item.children && !!item.children.length) {
          currentMenu.children = generator(item.children)
        }

        return currentMenu
      })
    }

    const breadcrumbList = computed(() => {
      return generator(route.matched)
    })

    // 监听全屏事件
    const toggleFullScreen = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
      } else {
        document.exitFullscreen && document.exitFullscreen()
      }
    }

    // 切换全屏图标
    const toggleFullScreenIcon = () => {
      iconsList[3].name =
        document.fullscreenElement !== 'null'
          ? 'FullscreenExitOutlined'
          : 'FullscreenOutlined'
    }

    // 监听键盘事件
    const watchKeyDownChange = (e) => {
      // console.log(e)
      if (e.target.localName !== 'body') return false
      // console.log(e.keyCode)

      switch (e.keyCode) {
        case 83:
          searchFlag.value = !searchFlag.value
          break

        case 27:
          searchFlag.value = false
          break

        default:
          break
      }
    }

    document.addEventListener('fullscreenchange', toggleFullScreenIcon)

    document.addEventListener('keydown', watchKeyDownChange)

    const searchFlag = ref(false)

    const iconsList = reactive([
      {
        name: 'SearchOutlined',
        tips: '搜索',
        eventObject: {
          click: () => (searchFlag.value = !searchFlag.value),
        },
      },
      {
        name: 'GithubFilled',
        tips: 'Github',
        eventObject: {
          click: () =>
            window.open('https://github.com/liusir1999/quick-admin-template'),
        },
      },
      {
        name: 'LockOutlined',
        tips: '锁屏',
      },
      {
        name: 'FullscreenOutlined',
        tips: '全屏',
        eventObject: {
          click: () => toggleFullScreen(),
        },
      },
      {
        name: 'SettingOutlined',
        tips: '设置',
      },
    ])

    const onRefresh = () => {
      router.push({
        path: `/redirect${unref(route).fullPath}`,
      })
    }

    const dropdownSelect = (name) => {
      router.push({ name })
    }

    return {
      onRefresh,
      dropdownSelect,
      breadcrumbList,
      iconsList,
      searchFlag,
    }
  },
})
</script>

<style lang="scss" scoped>
.page-header {
  height: 64px;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

  &-left {
    align-items: center;
  }

  &-trigger {
    display: inline-block;
    width: 64px;
    height: 64px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    .n-icon {
      display: flex;
      align-items: center;
      height: 64px;
      line-height: 64px;
    }

    &:hover {
      background: hsla(0, 0%, 100%, 0.08);
    }

    .anticon {
      font-size: 16px;
      color: #515a6e;
    }
  }

  &-trigger-min {
    width: auto;
    padding: 0 12px;
  }

  .link-text {
    font-size: 16px;
  }
}
</style>
