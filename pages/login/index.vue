<template>
  <div>
    <van-button @click="login">登录</van-button>    
  </div>
</template>
<script>
  export default {
    asyncData() {
      return {

      }
    },
    data() {
      return {
        value: "2222"
      }
    },
    watch: {
      value() {
        
      }
    },
    methods: {
      login() {
        this.$API_USER.login({
          mobile: 18368003190,
          password: "shenjing8"
        })
      }
    }
  }
</script>

