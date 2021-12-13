import Vue  from 'vue'
import VideoPreview from './index.vue'

// videos [ { src, poster } ]

const VideoPreviewConstructor = Vue.extend(VideoPreview)

const VideoPreviewModal = (config) => {

  const modalDom = new VideoPreviewConstructor({
    el: document.createElement("div")
  })
  document.body.appendChild(modalDom.$el)

  modalDom.videos = config.videos || []
  modalDom.startPosition = config.startPosition || 0

  // 弹框三个事件
  modalDom.globalClose = config.onClose || null 

}

export default VideoPreviewModal