<template>
  <div class="page-feedback">
    <comment
      @submit="handleSubmit"
    >
      发送反馈
    </comment>
  </div>
</template>
<script>
import Comment from '@/components/Comment'
export default {
  components: {
    Comment
  },
  methods: {
    async handleSubmit(target) {
      const result = await this.$API_CUSTOMER.feedbackCheck()
      if(!result) {
        this.$toast("超过每日反馈数量")
        return 
      }
      await this.$API_CUSTOMER.postFeedback({
        content: target
      })
      this.$toast({
        message: "反馈成功",
        onClose: () => {
          this.$router.go(-1)
        },
        overlay: true,
        forbidClick: true,
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .page-feedback {
    width: 100%;
    min-height: 100vh;
  }
</style>