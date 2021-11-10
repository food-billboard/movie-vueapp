<template>
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
      :rules="[{ required: true, message: '请输入密码' }]"
    />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">提交</van-button>
    </div>
    <loading :loading="loading" />
  </van-form>
</template>
<script>
  import Loading from '@/components/Loading'
  export default {
    components: {
      Loading
    },
    data() {
      return {
        loading: false,
        mobile: "",
        password: ""
      }
    },
    methods: {
      async onSubmit() {
        this.loading = true 
        await this.$API_USER.login({
          mobile: this.mobile,
          password: this.password
        })
        this.loading = false 
      }
    }
  }
</script>

