<template>
  <div class="page-detail">
    <video-preview
      :src="value.video"
      :poster="value.poster"
      class="page-detail-video"
    />
    <detail-content
      :value="value"
      class="page-detail-content"
    />
    <poster
      :value="value.images"
    />
    <actor
      :value="value.info ? value.info.actor: []"
    />
    <tag-com
      :value="value.tag"
      class="page-detail-tag"
    />
    <comment
      :id="value._id"
      class="page-detail-comment"
      :value="value.comment"
    />
    <van-button
      type="primary" 
      block 
      class="page-detail-button"
      @click="handleComment"
    >发布评论</van-button>
  </div>
</template>
<script>
import DetailContent from './components/content.vue'
import Poster from './components/poster.vue'
import Actor from './components/actor.vue'
import TagCom from './components/tag.vue'
import Comment from './components/comment.vue'
import VideoPreview from '@/components/Video'
export default {
  components: {
    DetailContent,
    Poster,
    Actor,
    TagCom,
    Comment,
    VideoPreview
  },
  async asyncData({ app, route }) {

    const { query: { id } } = route

    const isLogin = !!app.store.state.user.userInfo 
    const method = isLogin ? app.$API_CUSTOMER.getMovieDetail : app.$API_USER.getMovieDetail

    const result = await method({ _id: id })

    return {
      value: result
    }
  },
  data() {
    return {
      value: {}
    }
  },
  methods: {
    handleComment() {
      this.$router.push({
        path: "comment",
        query: {
          id: this.value._id,
          type: "movie"
        }
      })
    },
  }
}
</script>
<style lang="less" scoped>
  .page-detail {
    min-height: 100vh;
    &-video {
      width: 100%;
      // height: 20vw;
    }
    &-comment,
    &-tag,
    &-content {
      margin-bottom: 44px;
    }
    &-button {
      position: fixed;
      bottom: 0;
      left: 0;
    }
  }
</style>