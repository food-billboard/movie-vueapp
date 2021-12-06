<template>
  <div class="video-preview" @dblclick.stop="handleClose">
    <!-- <video
      
    /> -->
    <div class="video-preview-content">mock-dev</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: true 
    }
  },
  watch: {
    visible(current) {
      if(current === false) {
        const tipModal = document.getElementById("video-preview")
        if(tipModal) tipModal.parentNode.removeChild(tipModal)
      }
    }
  },
  methods: {
    handleClose() {
      this.globalClose?.()
      this.visible = false 
      delete window.videoPreviewShow 
    },
    setVisible(visible) {
      this.visible = visible
    },
  }
}
</script>
<style lang="less" scoped>
  .video-preview {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: black;
    position: fixed;
    top: 0;
    left: 0;
    &-content {
      width: 100%;
      height: 40vh;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      background-color: yellow;
    }
  }
</style>