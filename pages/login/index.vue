<template>
  <div>
    <van-button @click="login">登录</van-button>    
  </div>
</template>
<script>
  export default {
    async asyncData({ app }) {
      await app.$API_USER.login({
        mobile: 18368003190,
        password: "shenjing8"
      })
      return {

      }
    },
    methods: {
      login() {
        
      }
    }
  }
</script>

