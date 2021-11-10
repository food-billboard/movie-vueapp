import { Button, Uploader, Form, PasswordInput, Loading, Field } from 'vant'

export default {
  install(Vue) {
    Vue.use(Button)
    Vue.use(Uploader)
    Vue.use(Form)
    Vue.use(PasswordInput)
    Vue.use(Loading)
    Vue.use(Field)
  }
}