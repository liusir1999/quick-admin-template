<template>
  <div class="o-form">
    <oEditForm v-if="!isDetail" v-bind="$props" v-on="$attrs">
      <template v-slot:title> <slot name="title"></slot> </template>
      <slot></slot>
    </oEditForm>
    <oDetail v-else v-bind="$props">
      <slot></slot>
    </oDetail>
  </div>
</template>

<script>
import { NForm } from 'naive-ui'
import oDetailForm from './oDetailForm.vue'
import oEditForm from './oEditForm.vue'

export default {
  name: 'oForm',
  props: {
    ...NForm.props,
    options: {
      type: Array,
      default: () => [],
    },
    isDetail: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    oDetailForm,
    oEditForm,
  },
}
</script>

<style></style>
