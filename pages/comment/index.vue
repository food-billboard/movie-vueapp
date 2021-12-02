<template>
  <div class="page-comment">
    <comment
      @submit="handleSubmit"
    >
      发送评论
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
      const { query: { id, type } } = this.$route
      const method = type === "comment" ? this.$API_CUSTOMER.postComment : this.$API_CUSTOMER.postMovieComment
      await method({
        _id: id,
        content: target
      })
      this.$toast({
        message: "评论成功",
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
  .page-comment {
    width: 100%;
    min-height: 100vh;
  }
</style>