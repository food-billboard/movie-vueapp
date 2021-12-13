<template>
  <div class="login-form">
    <van-form @submit="onSubmit">
      <van-field
        v-model="mobile"
        type="tel"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        :rules="[
          { required: true, message: '请输入密码' },
          {
            pattern: /^[a-zA-Z0-9]{8,}$/,
            message: '不正确的邮箱格式',
          },
        ]"
      />
      <van-field
        v-model="email"
        label="邮箱"
        placeholder="请输入邮箱"
        :rules="[
          { required: true, message: '请输入邮箱' },
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '不正确的邮箱格式',
          },
        ]"
      />
      <van-field
        v-model="captcha"
        center
        clearable
        label="验证码"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请输入验证码' },
          {
            pattern: /^[a-zA-Z0-9]{6}$/,
            message: '不正确的验证码格式',
          },
        ]"
      >
        <template #button>
          <email-captcha type="register" :email="email" />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
      <loading :loading="loading" />
    </van-form>
  </div>
</template>
<script>
import EmailCaptcha from './captcha.vue'
import Loading from '@/components/Loading'
export default {
  components: {
    Loading,
    EmailCaptcha,
  },
  data() {
    return {
      loading: false,
      mobile: '',
      password: '',
      email: '',
      captcha: '',
    }
  },
  methods: {
    async onSubmit() {
      this.loading = true
      await this.$API_USER.register({
        mobile: this.mobile,
        password: this.password,
        email: this.email,
        captcha: this.captcha,
      })
      this.loading = false
    },
  },
}
</script>
<style lang="less" scoped>
.login-form {
  height: 100vh;
}
</style>

