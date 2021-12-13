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
        :rules="[{ required: true, message: '请输入密码' }]"
      />
      <div class="login-form-action">
        <van-button round block type="info" native-type="submit">提交</van-button>
        <div class="login-form-action-sub">
          <nuxt-link class="login-form-action-register" to="/register" >注册</nuxt-link>
          <nuxt-link class="login-form-action-forget" to="/forget">忘记密码</nuxt-link>
        </div>
      </div>
      <loading :loading="loading" />
    </van-form>
  </div>
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
      },
    }
  }
</script>
<style lang="less" scoped>
  @import url("/assets/global.less");
  .login-form {
    height: 100vh;
    &-action {
      margin-top: @normal-margin;
      &-sub {
        width: 100%;
        padding: 0 @normal-padding / 2;
        margin-top: @normal-margin/ 4;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        & span {
          font-size: @sub-title-font-size !important;
        }
      }
    }
  }
</style>

