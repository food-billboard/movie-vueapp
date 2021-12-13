import Vue from 'vue'

function internalResolve(context, params={}) {
  context.$router.push({
    path: "/login",
    ...params
  })
}

function internalReject(context, params={}) {
  context.$toast({
    message: "未登录无法操作",
    ...params 
  })
}

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
    Vue.prototype.$confirm2Login = async function(context, {
      done,
      resolve,
      reject,
      dialog={}
    }) {
      if(context.$isLogin(context)) {
        if(done) await done()
        return 
      } 
      return context.$dialog.confirm({
        title: '提示',
        message: '当前未登录，是否前往登录',
        ...dialog
      })
      .then(_ => {
        if(resolve) return resolve(internalResolve.bind(this, context))
        return internalResolve(context)
      })
      .catch(() => {
        if(reject) return reject(internalReject.bind(this, context))
        return internalReject(context)
      })
    }
  }
})