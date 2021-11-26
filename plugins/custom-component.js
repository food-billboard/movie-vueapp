import ColorIcon from '@/components/ColorIcon'
import ColorDiv from '@/components/ColorDiv'

export default {
  install(Vue) {
    Vue.component('color-icon', ColorIcon)
    Vue.component('color-div', ColorDiv)
  }
}