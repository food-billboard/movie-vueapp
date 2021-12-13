<template>
  <div>
    <video 
      id="video" 
      class="video-preview" 
      controls="controls" 
      :src="src" 
      :poster="poster || 'none'" 
      webkit-playsinline="true" 
      playsinline="true" 
      x5-video-player-type="h5" 
      x5-video-player-fullscreen="true"
      x-webkit-airplay="true" 
      preload="true"
    ></video>
  </div>
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      default: ""
    },
    poster: {
      type: String,
      default: ""
    }
  }
}
</script>
<style lang="less" scoped>
  .video-preview {
    width: 100%;
  }
</style>