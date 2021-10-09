import { Button, Uploader } from 'vant'
import "vant/lib/index.css"

export default {
  install(Vue) {
    Vue.use(Button)
    Vue.use(Uploader)
  }
}