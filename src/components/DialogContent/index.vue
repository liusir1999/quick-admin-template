<template></template>

<script>
import { useDialog } from 'naive-ui'

export default {
  name: 'DialogContent',
  setup() {
    window['$dialog'] = useDialog()
  },
}
</script>
