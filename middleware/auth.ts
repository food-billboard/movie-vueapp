
const WHITE_LIST: string[] = [

]

function pathWhiteValidator(path: string) {
  console.log(path, WHITE_LIST)
  return false 
}

export default function (context: any) {
  const { app, redirect } = context
  const cookiesToken = app.$cookies.get('a6a7420d799ace72fefb1de7ec0be12f0ae900b29dad50ea9ebf832d999fc7d4')
  const current = app.router.history.current
  const { path } = current 
  if (cookiesToken) {
    if(path.includes("login")) {
      redirect({
        path: "/"
      })
    }
    // 每次跳转路由 验证登录状态是否过期

    // return app.$api.isAuth().then((res: any) => {
    //   if (res.s === 1) {
    //     if (res.d.isExpired) {   // 过期 移除登陆验证信息
    //       app.$utils.removeAuthInfo(context)
    //     } else {                 // 未过期 重新设置存储
    //       const stateToken = store.state.auth.token
    //       if (cookiesToken && stateToken === '') {
    //         store.commit('auth/UPDATE_USERINFO', app.$cookies.get('userInfo'))
    //         store.commit('auth/UPDATE_USERID', app.$cookies.get('userId'))
    //         store.commit('auth/UPDATE_CLIENTID', app.$cookies.get('clientId'))
    //         store.commit('auth/UPDATE_TOKEN', app.$cookies.get('token'))
    //       }
    //     }
    //   }
    // })
  }else if(!pathWhiteValidator(path)) {
    redirect({
      path: "login"
    })
  }
}