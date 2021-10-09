<template>
  <div>
    <van-button @click="login">登录</van-button>    
    <chunk-upload></chunk-upload>
  </div>
</template>
<script>
  import ChunkUpload from '@/components/ChunkUpload'
  export default {
    components: {
      ChunkUpload
    },
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
        this.$API_USER.login({
          mobile: 18368003190,
          password: "shenjing8"
        })
      }
    }
  }
</script>

