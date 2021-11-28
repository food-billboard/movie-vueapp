<template>
  <div class="page-detail">
    <video-com
      :src="value.video"
      :poster="value.poster"
    />
    <detail-content
      :value="value"
    />
    <poster
      :value="value.images"
    />
    <actor
      :value="value.info ? value.info.actor: []"
    />
    <tag-com
      :value="value.tag"
    />
    <comment
      :id="value._id"
      :value="value.comment"
    />
  </div>
</template>
<script>
import VideoCom from './components/video.vue'
import DetailContent from './components/content.vue'
import Poster from './components/poster.vue'
import Actor from './components/actor.vue'
import TagCom from './components/tag.vue'
import Comment from './components/comment.vue'
export default {
  components: {
    VideoCom,
    DetailContent,
    Poster,
    Actor,
    TagCom,
    Comment
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
      value: {

      }
    }
  }
}
</script>
<style lang="less" scoped>
  .page-detail {
    min-height: 100vh;
  }
</style>