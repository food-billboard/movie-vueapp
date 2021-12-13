import ColorIcon from '@/components/ColorIcon'
import ColorDiv from '@/components/ColorDiv'
import VideoPreview from '@/components/VideoPreview'

export default {
  install(Vue) {
    Vue.component('color-icon', ColorIcon)
    Vue.component('color-div', ColorDiv)
    Vue.prototype.$videoPreview = function(config) {
      if(window.videoPreviewShow) return 
      VideoPreview(config)
      window.videoPreviewShow = true 
    }
  }
}