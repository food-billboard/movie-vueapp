<template>
  <div
    :class="['comment-item', 'background-color', realColorClass, 'thirdly']"
    @click="handleToDetailComment"
  >
    <div class="comment-item-header">
      <van-image
        round
        width="1rem"
        height="1rem"
        :src="value.user_info.avatar"
        @click.stop="handleGetDetail(value.user_info._id)"
      />
      <div class="comment-item-header-title normal-title">
        <div
          :class="[
            'color',
            'primary',
            'comment-item-header-title-main',
            'normal-title',
            realColorClass,
          ]"
        >
          <div class="van-ellipsis" @click.stop="handleComment">
            {{ value.user_info.username || '' }}
          </div>
          <span>说: </span>
        </div>
        <div>
          {{ value.createdAt }}
        </div>
      </div>
      <div class="comment-item-header-like">
        <span class="comment-item-header-like-count">{{
          $number(likeCount || 0)
        }}</span>
        <color-icon :name="iconName" @click.stop="handleLike" />
      </div>
    </div>
    <div class="comment-item-content">
      <div class="comment-item-content-text van-multi-ellipsis--l4">
        {{ value.content.text }}
      </div>
      <div class="comment-item-content-image">
        <van-row gutter="20" type="flex" justify="space-around">
          <van-col v-for="(item, index) in imageList" :key="index" span="8">
            <van-image
              width="100%"
              height="30vw"
              class="comment-item-content-image-item"
              fit="contain"
              :src="item.src"
              @click.stop="handlePreview(index)"
            />
          </van-col>
        </van-row>
      </div>
    </div>
    <div v-if="footer" class="comment-item-footer">
      <van-image
        v-for="item in userList"
        :key="item._id"
        width="10vw"
        height="10vw"
        :src="item.avatar"
        round
        @click.stop="handleGetDetail(item._id)"
      />
    </div>
    <slot name="footer"></slot>
  </div>
</template>
<script>
import { ImagePreview } from 'vant'
import LayoutMixin from '@/mixins/layout'
export default {
  mixins: [LayoutMixin],
  props: {
    value: {
      type: Object,
      default() {
        return {
          user_info: {},
          content: {
            text: '',
            image: [],
            video: [],
          },
        }
      },
    },
    footer: {
      type: Boolean,
      default: true,
    },
    commentSelf: {
      type: Boolean,
      default: true,
    },
    commentDetail: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      like: !!this.value.like,
      likeCount: this.value.total_like || 0,
    }
  },
  computed: {
    iconName() {
      return this.like ? 'like' : 'like-o'
    },
    imageList() {
      const { image, video } = this.value.content || {}
      return [
        ...image.map((item) => {
          return {
            src: item,
            isImage: true,
          }
        }),
        ...video.map((item) => {
          const { src, poster } = item
          return {
            src: poster,
            isImage: false,
            videoSrc: src,
          }
        }),
      ]
    },
    userList() {
      return (this.value.comment_users || []).slice(0, 20)
    },
  },
  watch: {
    value: {
      handler(newValue, oldValue) {
        if (newValue.like !== oldValue.like) {
          this.like = newValue.like
        }
        if (newValue.total_like !== oldValue.total_like) {
          this.likeCount = newValue.total_like
        }
      },
      deep: true,
    },
  },
  methods: {
    async handleLike() {
      await this.$confirm2Login(this, {
        done: async () => {
          const method = this.value.like
            ? this.$API_CUSTOMER.deleteMovieCommentLike
            : this.$API_CUSTOMER.putMovieCommentLike
          await method({ _id: this.value._id })
          this.like = !this.like
          this.likeCount += this.like ? 1 : -1
        },
      })
    },
    handleToDetailComment() {
      if (!this.commentDetail) return
      this.$router.push({
        path: '/comment-detail',
        query: {
          id: this.value._id,
        },
      })
    },
    handleGetDetail(userId) {
      const { _id } = this.$store.state.user.userInfo || {}
      if (userId === _id) {
        this.$router.push({ path: '/mine' })
      } else {
        this.$router.push({
          path: '/user',
          query: {
            id: userId,
          },
        })
      }
    },
    handleComment() {
      if (!this.commentSelf) return
      this.$router.push({
        path: '/comment',
        query: {
          id: this.value._id,
          type: 'comment',
        },
      })
    },
    handlePreview(index) {
      const target = this.imageList[index]
      const { isImage } = target
      if (!isImage) return this.handlePreviewVideo(index)
      ImagePreview({
        images: this.value.content.image || [],
        startPosition: index,
      })
    },
    handlePreviewVideo(index) {
      const realIndex = index - this.value.content.image.length
      this.$videoPreview({
        videos: this.value.content.video || [],
        startPosition: realIndex,
      })
    },
  },
}
</script>
<style lang="less" scoped>
@import url('/assets/global.less');
.comment-item {
  width: 100%;
  margin-bottom: @normal-margin;
  &-header {
    display: flex;
    width: 100%;
    padding: @normal-padding / 4;
    box-sizing: border-box;
    align-items: center;
    &-title {
      flex: 1;
      padding: 0 @normal-padding / 4;
      box-sizing: border-box;
      overflow: hidden;
      &-main {
        display: flex;
        & > div {
          font-weight: bold;
        }
        & span {
          font-weight: normal;
          flex: 1;
        }
      }
      & div:nth-of-type(2) {
        font-size: @normal-font-size;
      }
    }
    &-like {
      display: flex;
      align-items: center;
      &-count {
        font-size: @sub-title-font-size;
        margin-right: 0.5em;
      }
    }
  }
  &-content {
    width: 100%;
    box-sizing: border-box;
    padding: @normal-padding / 4;
    &-text {
      font-size: @sub-title-font-size;
      min-height: 4em;
      text-indent: 2em;
      padding: @normal-padding / 4;
      background-color: @normal-background;
      border-radius: @normal-padding / 4;
    }
    &-image {
      &-item {
        border: 1px dashed @normal-background;
        margin-top: @normal-margin;
      }
    }
  }
}
</style>