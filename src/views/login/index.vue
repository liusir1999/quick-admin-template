<template>
  <div class="login">
    <n-card class="login-wrap">
      <o-form
        label-placement="left"
        label-width="80px"
        :model="form"
        :options="options"
        @on-username-change="onUserNameChange"
      >
        <template v-slot:title>
          <!-- <div class="title">登录</div> -->
        </template>

        <div class="flex-end">
          <n-button type="primary" @click="onLogin">确认</n-button>
        </div>
      </o-form>
    </n-card>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { login } from '@/api/user'
// import { useDesignStore } from '@/store/modules/design'

// const designStore = useDesignStore()

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
    const res = await login(form)

    console.log(res)
  } catch (error) {
    console.log(error)
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
