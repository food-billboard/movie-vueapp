import Vue from 'vue'
import { Upload } from 'chunk-file-upload'

Vue.use({
  install(Vue) {
    Vue.prototype.$ChunkUpload = Upload 
  }
})