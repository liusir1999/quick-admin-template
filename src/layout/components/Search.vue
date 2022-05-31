<template>
  <transition :duration="1000" name="zoom-fade" mode="out-in" appear>
    <div class="search-box" v-show="show">
      <div class="search-box-title">搜索栏</div>

      <!-- <n-select
        v-model:value="dumpName"
        filterable
        placeholder="选择菜单"
        :options="options"
        @change="onChange"
      ></n-select> -->
      <n-input v-model:value="dumpName" placeholder="请输入菜单名称"></n-input>

      <div class="search-list">
        <template v-if="filterOptions.length">
          <n-list>
            <n-list-item v-for="item in filterOptions" :key="item.name">
              <!-- :description="`名称：${item.name}`" -->
              <n-thing
                :title="`名称：${item.label}`"
                @click.native="onDump(item.name)"
              >
                {{ `路径：${item.path}` }}
              </n-thing>
            </n-list-item>
          </n-list>
        </template>

        <n-empty v-else description="你什么也找不到">
          <template #extra>
            <n-button size="small"> 看看别的 </n-button>
          </template>
        </n-empty>
      </div>

      <div class="search-box-tip flex">
        您可以使用快捷键
        <div class="search-box-keydown">S</div>
        唤醒搜索面板，按
        <div class="search-box-keydown">esc</div>
        关闭
      </div>
    </div>
  </transition>
</template>

<script>
import { computed, defineComponent, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Search',
  props: {
    show: {
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const dumpName = ref('')

    const router = useRouter()

    const options = router.getRoutes().reduce((acc, item) => {
      if (item?.meta.title && item.children.length === 0)
        acc.push(
          reactive({
            label: item.meta.title,
            name: item.name,
            path: item.path,
          })
        )

      return acc
    }, [])

    const filterOptions = computed(() => {
      if (dumpName.value === '') return options
      return options.filter((item) => {
        if (item.label.includes(dumpName.value)) return item
        else if (item.path.includes(dumpName.value)) return item
        else if (item.name.includes(dumpName.value)) return item
      })
    })

    const onDump = (name) => {
      router.push({ name })
      emit('update:show', !props.show)
    }

    return {
      dumpName,
      options,
      filterOptions,
      onDump,
    }
  },
})
</script>

<style lang="scss">
// .zoom-fade-enter-active,
// .zoom-fade-leave-active {
//   transition: opacity 1s, top 1s;
// }

// .zoom-fade-enter-form {
//   opacity: 1 !important;
//   top: 0% !important;
// }

// .zoom-fade-enter-to {
//   opacity: 1 !important;
//   top: 10% !important;
// }

// .zoom-fade-leave-form {
//   opacity: 1 !important;
//   top: 10% !important;
// }

// .zoom-fade-leave-to {
//   opacity: 0 !important;
//   top: 0% !important;
// }

.zoom-fade-enter-active {
  animation-name: FormTop;
  animation-duration: 0.6s;
  animation-fill-mode: both;
}

.zoom-fade-leave-active {
  animation-name: FormBottom;
  animation-duration: 0.6s;
  animation-fill-mode: both;
}

@keyframes FormTop {
  0% {
    opacity: 0.3;
    top: 0%;
  }

  to {
    opacity: 1;
    top: 10%;
  }
}

@keyframes FormBottom {
  0% {
    opacity: 1;
    top: 10%;
  }

  to {
    opacity: 0;
    top: 0%;
  }
}

.search-box {
  position: absolute;
  top: 10%;
  left: 50%;
  width: 600px;
  // height: 100px;
  z-index: 77;
  padding: 10px;
  background-color: #fff;
  transform: translate(-50%, 0);
  box-shadow: 0 4px 4px rgb(0 21 41 / 8%);

  &-title {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 10px;
  }

  &-tip {
    color: #a0a4aa;
    margin-top: 10px;
    align-items: center;
    justify-content: center;
  }

  &-keydown {
    color: #fff;
    padding: 1px 2px;
    border-radius: 10%;
    margin: 0 4px;
    background-color: #606266;
  }

  .search-list {
    margin-top: 10px;
    cursor: pointer;
    max-height: 300px;
    overflow: auto;
  }
}
</style>
