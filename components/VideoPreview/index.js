import Vue  from 'vue'
import VideoPreview from './index.vue'

const VideoPreviewConstructor = Vue.extend(VideoPreview)

const VideoPreviewModal = (config) => {

  const modalDom = new VideoPreviewConstructor({
    el: document.createElement("div")
  })
  document.body.appendChild(modalDom.$el)

  modalDom.src = config.src 

  // 弹框三个事件
  modalDom.globalClose = config.onClose || null 

}

export default VideoPreviewModal