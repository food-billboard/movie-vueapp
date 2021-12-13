<template>
  <div
    class="comment-page"
  >
    <van-field
      v-model="text"
      rows="6"
      type="textarea"
      maxlength="300"
      placeholder="这里输入文字内容"
      show-word-limit
    />
    <ChunkUpload
      :max-count="6"
      accept="video/*,image/*"
      multiple
      class="comment-page-upload"
      @change="handleUploadFile"
    />
    <loading-button
      round 
      block 
      type="info"
      class="comment-page-button"
      :action="handleSubmit"
    >
      <slot></slot>
    </loading-button>
  </div>
</template>
<script>
import LoadingButton from '@/components/LoadingButton'
import ChunkUpload from '@/components/ChunkUpload'
export default {
  components: {
    ChunkUpload,
    LoadingButton
  },
  data() {
    return {
      text: "",
      mediaList: []
    }
  },
  methods: {
    handleUploadFile(value) {
      this.mediaList = value 
    },
    handleSubmit() {
      const {
        video,
        image,
      } = this.mediaList.reduce((acc, cur) => {
        const { task, _id } = cur 
        const mime = task.file.mime 
        if(mime.startsWith("image")) {
          acc.image.push(_id)
        }else {
          acc.video.push(_id)
        }
        return acc 
      }, {
        video: [],
        image: []
      })
      this.$emit("submit", {
        text: this.text,
        video,
        image
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import url("/assets/global.less");
  .comment-page {
    &-upload,
    &-button {
      margin-top: @normal-margin;
    }
  }
</style>