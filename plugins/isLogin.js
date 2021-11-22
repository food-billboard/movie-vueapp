import Vue from 'vue'

Vue.use({
  install(Vue) {
    Vue.prototype.$isLogin = function isLogin(context) {
      try {
        return !!context.$store.state.user.userInfo 
      }catch(err) {
        return false 
      }
    } 
    Vue.prototype.$client2Login = function(context) {
      console.log(context)
    }
  }
})