<template>
  <div class="comment-list-header">
    <div
      class="comment-list-header-background"
      :style="{ background: `url(${value.poster})` }"
    ></div>
    <van-image
      width="20vw"
      height="20vw"
      fit="contain"
      :class="['comment-list-header-image', 'bgColor', 'border-color', realColorClass]"
      :src="value.poster"
      @click="onPreviewChange"
    />
    <div class="comment-list-header-content">
      <div class="comment-list-header-content-title normal-title ellipsis">
        {{value.name}}
      </div>
      <div class="comment-list-header-content-description van-multi-ellipsis--l2">
        {{value.description}}
      </div>
    </div>
    <color-icon name="arrow" @click="handleGetDetail"></color-icon>
    <van-image-preview v-model="previewShow" :images="images" @change="onPreviewChange" />
  </div>
</template>
<script>
import LayoutMixins from '@/mixins/layout'
export default {
  mixins: [
    LayoutMixins
  ],
  props: {
    value: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      previewShow: false 
    }
  },
  computed: {
    images() {
      return [
        this.value.poster
      ]
    }
  },
  methods: {
    onPreviewChange() {
      this.previewShow = !this.previewShow
    },
    handleGetDetail() {
      const { _id } = this.value 
      this.$router.push({
        path: "/detail",
        query: {
          id: _id
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  @import url("/assets/global.less");
  .comment-list-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: @normal-padding;
    width: 100vw;
    box-sizing: border-box;
    overflow: hidden;
    &-background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      filter: blur(50px);
    }
    &-image {
      border: 1px dashed;
      flex: 1;
    }
    &-content {
      flex: 1;
      width: 100%;
      padding: 0 @normal-padding;
      overflow: hidden;
      &-title {
        text-shadow: none;
        background-color: transparent;
        width: 100%;
      }
      &-description {
        border: 1px dashed rgba(0, 0, 0, .2);
        font-size: @normal-font-size;
        padding: 1PX;
        width: 100%;
      }
    }
  }
</style>