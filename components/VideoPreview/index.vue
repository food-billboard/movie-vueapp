<template>
  <div id="video-preview" @click.stop="dbClick">
    <!-- <video
      
    /> -->
    <div class="video-preview-content">mock-dev</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: true,
      videos: [],
      startPosition: 0,
      times: -1
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
    dbClick() {
      const now = Date.now()
      // 双击
      if(now - this.times < 300) {
        this.handleClose()
        this.times = -1 
      }else {
        this.times = now 
      }
    }
  }
}
</script>
<style lang="less" scoped>
  #video-preview {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: black;
    position: fixed;
    top: 0;
    left: 0;
    .video-preview-content {
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