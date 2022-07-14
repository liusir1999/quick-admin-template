<template>
  <div class="tag-views flex alignCenter">
    <div
      ref="navWrap"
      class="tab-card"
      :class="{ 'tabs-card-scrollable': scrollable }"
    >
      <span
        class="tag-views-icon tabs-card-prev"
        :class="{ 'tabs-card-prev-hide': !scrollable }"
        @click="scrollPrev"
      >
        <n-icon size="18">
          <LeftOutlined />
        </n-icon>
      </span>

      <span
        class="tag-views-icon tabs-card-next"
        :class="{ 'tabs-card-next-hide': !scrollable }"
        @click="scrollNext"
      >
        <n-icon size="18">
          <RightOutlined />
        </n-icon>
      </span>
      <div ref="navScroll" class="tag-views-scroll">
        <Draggable
          :list="tabsList"
          animation="300"
          item-key="fullPath"
          class="flex alignCenter"
        >
          <template #item="{ element, index }">
            <div
              :id="`tag${element.fullPath.split('/').join('\/')}`"
              class="tag-item flex alignCenter"
              :class="activeKey === element.fullPath ? 'tag-item-active' : ''"
              @click.stop="onDump(element.name, element.fullPath)"
            >
              <span class="tag-item-text">{{ element.meta.title }}</span>

              <!--  v-if="activeKey !== element.fullPath" -->
              <n-icon
                class="tag-item-icon"
                size="14"
                @click.stop="onCloseTag(index)"
              >
                <CloseOutlined />
              </n-icon>
            </div>
          </template>
        </Draggable>
      </div>
    </div>

    <div class="tag-views-close tag-views-icon flex alignCenter">
      <n-dropdown trigger="hover" :options="options" @select="handleSelect">
        <n-icon size="18">
          <DownOutlined />
        </n-icon>
      </n-dropdown>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  h,
  nextTick,
  onMounted,
  reactive,
  ref,
  watch,
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Draggable from 'vuedraggable'
import { useDesignStore } from '../../store/modules/design'
import { IconsMap } from '../../lib/router-icon'
import { renderIcon } from '../../utils'
import elementResizeDetectorMaker from 'element-resize-detector'

export default defineComponent({
  name: 'TagViews',
  components: {
    Draggable,
    CloseOutlined: IconsMap['CloseOutlined'],
    DownOutlined: IconsMap['DownOutlined'],
    LeftOutlined: IconsMap['LeftOutlined'],
    RightOutlined: IconsMap['RightOutlined'],
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const designStore = useDesignStore()

    const tabsList = designStore.tabsList
    const activeKey = ref(0)

    const options = reactive([
      {
        label: '刷新当前',
        key: 'ReloadOutlined',
        icon: renderIcon(IconsMap['ReloadOutlined']),
      },
    ])

    // 重载页面
    const reloadPage = () => {
      router.push({ path: '/redirect' + route.fullPath })
    }

    // 下拉选中
    const handleSelect = (key) => {
      switch (key) {
        case 'ReloadOutlined':
          reloadPage()
          break

        default:
          break
      }
    }

    // 获取路由信息
    const getRouteInfo = (route) => {
      const { name, meta, query, fullPath } = route
      return {
        name,
        meta,
        query,
        fullPath,
      }
    }

    // 修改选中Index
    const updateActiveIndex = (fullPath) => {
      const key =
        tabsList.find((item) => item.fullPath === fullPath).fullPath || ''
      if (key) activeKey.value = key
    }

    // 跳转
    const onDump = (name, fullPath) => {
      if (fullPath === route.fullPath) return
      activeKey.value = fullPath
      router.push({ name })
    }

    // 关闭Tag
    const onCloseTag = (index) => {
      designStore.delTabs(index)
      updateActiveIndex(route.fullPath)
    }

    const navWrap = ref(null)
    const navScroll = ref(null)
    const scrollable = ref(false)

    /**
     * @param autoScroll 是否开启自动滚动功能
     */
    const updateNavScroll = async (autoScroll) => {
      await nextTick()

      const containerWidth = navScroll.value.offsetWidth
      const navWidth = navScroll.value.scrollWidth

      if (containerWidth < navWidth) {
        scrollable.value = true
        if (autoScroll) {
          const tagList = navScroll.value.querySelectorAll('.tag-item') || []
          ;[...tagList].forEach((tag) => {
            if (tag.id === `tag${activeKey.value}`) {
              tag.scrollIntoView && tag.scrollIntoView()
            }
          })
        }
      } else {
        scrollable.value = false
      }
    }

    const handleResize = () => {
      updateNavScroll(true)
    }

    const onElementResize = () => {
      let observer
      observer = elementResizeDetectorMaker()

      observer.listenTo(navWrap.value, handleResize)
    }

    onMounted(() => {
      onElementResize()
    })

    // 监听路由
    watch(
      () => route.fullPath,
      (to) => {
        designStore.addTabs(getRouteInfo(route))
        activeKey.value = to
        updateNavScroll(true)
      },
      {
        immediate: true,
      }
    )

    /**
     * @param value 要滚动到的位置
     * @param amplitude 每次滚动的长度
     */
    const scrollTo = (value, amplitude) => {
      const currentScroll = navScroll.value.scrollLeft
      const scrollWidth =
        (amplitude > 0 && currentScroll + amplitude >= value) ||
        (amplitude < 0 && currentScroll + amplitude <= value)
          ? value
          : currentScroll + amplitude
      navScroll.value && navScroll.value.scrollTo(scrollWidth, 0)

      if (scrollWidth === value) return
      return window.requestAnimationFrame(() => scrollTo(value, amplitude))
    }

    const scrollPrev = () => {
      // 容器本身宽度
      const containerWidth = navScroll.value.offsetWidth
      // 容器x方向滚动距离
      const currentScroll = Math.ceil(navScroll.value.scrollLeft)

      if (!currentScroll) return

      const scrollLeft =
        currentScroll > containerWidth ? currentScroll - containerWidth : 0
      scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20)
    }

    const scrollNext = () => {
      // debugger
      // 容器本身宽度
      const containerWidth = navScroll.value.offsetWidth
      // 容器实际宽度
      const navWidth = navScroll.value.scrollWidth
      // 容器x方向上得滚动距离
      const currentScroll = Math.ceil(navScroll.value.scrollLeft)

      if (navWidth - currentScroll <= containerWidth) return
      const scrollLeft =
        navWidth - currentScroll > containerWidth * 2
          ? currentScroll + containerWidth
          : navWidth - containerWidth
      scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20)
    }

    return {
      tabsList,
      activeKey,
      navScroll,
      navWrap,
      options,
      scrollable,
      onDump,
      onCloseTag,
      handleSelect,
      scrollPrev,
      scrollNext,
    }
  },
})
</script>

<style lang="scss" scoped>
.tag-views {
  background: #f5f7f9;
  display: flex;
  padding: 6px 19px 6px 10px;

  .tag-views-scroll {
    white-space: nowrap;
    overflow: hidden;
    flex-grow: 1;
  }

  .tabs-card-scrollable {
    padding: 0 32px;
    overflow: hidden;
  }

  .tab-card {
    -webkit-box-flex: 1;
    flex-grow: 1;
    flex-shrink: 1;
    overflow: hidden;
    position: relative;

    .tabs-card-prev,
    .tabs-card-next {
      width: 32px;
      text-align: center;
      position: absolute;
      line-height: 32px;
      cursor: pointer;

      .n-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 32px;
        width: 32px;
      }
    }

    .tabs-card-prev {
      left: 0;
    }

    .tabs-card-next {
      right: 0;
    }

    .tabs-card-next-hide,
    .tabs-card-prev-hide {
      display: none;
    }
  }

  .tag-item {
    height: 32px;
    margin-right: 6px;
    padding: 0 10px;
    background-color: #fff;
    border-radius: 2px;
    cursor: pointer;

    &:last-child {
      margin: 0;
    }

    &-active {
      color: rgb(26, 26, 195);
    }

    &-icon {
      margin-left: 4px;
    }
  }

  &-icon {
    width: 32px;
    cursor: pointer;
  }
}
</style>
