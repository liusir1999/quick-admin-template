<template>
  <div class="o-edit-form">
    <slot name="title"></slot>

    <n-form v-bind="$props" v-on="$attrs">
      <n-form-item
        v-for="(opt, index) in filterOptions"
        :key="opt.field + '-' + index"
        :label="opt.label"
      >
        <!-- text -->
        <template v-if="opt.type === 'text'">
          <span>{{ model[opt.field] || '暂无数据' }}</span>
        </template>

        <!-- input -->
        <template v-else-if="['input', 'password'].includes(opt.type)">
          <n-input
            v-model:value="model[opt.field]"
            v-bind="opt"
            @change="onCustomChange($event, opt)"
          ></n-input>
        </template>
      </n-form-item>

      <slot></slot>
    </n-form>
  </div>
</template>

<script>
import { NForm } from 'naive-ui'
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'oEditForm',
  props: {
    ...NForm.props,
    options: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['username-change'],
  setup(props, { emit }) {
    const defaultProps = {
      type: 'input',
      show: true,
      clearable: true,
    }

    const filterByType = (opt) => {
      const condition = {
        input: {
          ...defaultProps,
          ...opt,
        },
        password: {
          ...defaultProps,
          clearable: false,
          showPasswordOn: 'mousedown',
          ...opt,
        },
      }

      return condition[opt.type || 'input']
    }

    const { options } = props

    const filterOptions = computed(() =>
      options.map(filterByType).filter((item) => item.show)
    )

    const onCustomChange = (val, opt) => {
      emit(`${opt.field}-change`, val)
    }

    return {
      filterOptions,
      onCustomChange,
    }
  },
})
</script>

<script setup></script>

<style scoped></style>
