<template>
  <div class="login">
    <n-card class="login-wrap">
      <Form
        label-placement="left"
        label-width="80px"
        :model="form"
        :options="options"
        @on-username-change="onUserNameChange"
      >
        <template v-slot:title>
          <div class="title">登录</div>
        </template>

        <div class="flex-end">
          <n-button :loading="btnLoading" type="primary" @click="onLogin"
            >确认</n-button
          >
        </div>
      </Form>
    </n-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
}
</script>

<script setup>
import { reactive, ref } from 'vue'
import { useMessage } from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../../store/modules/user'

const userStroe = useUserStore()
const message = useMessage()
const router = useRouter()
const route = useRoute()

const redirect = route.query.redirect

let btnLoading = ref(false)

const form = reactive({
  username: 'admin',
  password: 'lld0511..',
})

const options = reactive([
  {
    label: '账号',
    field: 'username',
  },
  {
    label: '密码',
    field: 'password',
    type: 'password',
  },
])

const onLogin = async () => {
  try {
    message.loading('登录中...')
    btnLoading.value = true
    const res = await userStroe.login(form)
    message.destroyAll()
    btnLoading.value = false
    if (res.code === 200) {
      message.success('登录成功,即将进入系统')
      router.push(redirect ? redirect : '/dashboard/console')
    }
  } catch (error) {
    console.log(error)
    btnLoading.value = false
  }
}

const onUserNameChange = (val) => {
  console.log(val)
}
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  height: 100%;

  .login-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    max-width: 600px;
    transform: translate(-50%, -50%);
  }
}
</style>
