<template>
   <van-button :disabled="loading" style="width: 100PX" size="small" type="primary" @click="sendEmail">{{text}}</van-button>
</template>
<script>
export default {
  props: {
    email: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "forget"
    }
  },
  data() {
    return {
      second: 60,
      loading: false,
      timer: ""
    }
  },
  computed: {
    text() {
      return this.loading ? (this.second + "s后再次发送") : "发送验证码"
    }
  },
  beforeDestroy() {
    this.destroySecond()
  },
  methods: {
    async sendEmail() {
      if(!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.email)) {
        this.$toast("请填写正确的邮箱格式")
        return 
      }
      this.loading = true 
      this.startSecond() 
      await this.$API_USER.sendEmail({
        email: this.email,
        type: this.type 
      })
      .catch(_ => {
        this.destroyAll(true)
      })
    },
    startSecond() {
      this.destroySecond()
      this.second = 60 
      this.timer = setInterval(() => {
        if(this.second > 0) {
          this.second --
        }else {
          this.destroyAll()
        }
      }, 1000)
    },
    destroyAll(message) {
      this.destroySecond(message)
      this.loading = false 
    },
    destroySecond(message) {
      clearInterval(this.timer)
      if(message) this.$toast("发送失败，请重试")
    }
  }
}
</script>