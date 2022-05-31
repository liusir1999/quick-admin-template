<script lang="jsx">
import { NEmpty } from 'naive-ui'
import { defineComponent, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'Redirect',
  setup() {
    const router = useRouter()
    const route = useRoute()

    onBeforeMount(() => {
      const { params, query } = route

      const { path } = params

      router.push({
        path: `/${Array.isArray(path) ? path.join('/') : path}`,
        query,
      })
    })

    return () => <NEmpty />
  },
})
</script>
