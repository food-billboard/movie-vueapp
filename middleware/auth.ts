import { withTry } from '../utils'

export const HOME_MENU = [
  "/home",
  "/mine"
]

const WHITE_LIST: string[] = [
  "/home",
  "/classify",
  "/rank",
  "/search",
  "/attentions",
  "/fans",
  "/browser",
  "/store",
  "/issue-list",
  "/user",
  "/comment-list",
  "/comment-detail",
  "/special",
  "/detail",
  "/register",
  "/forget",
]

function pathWhiteValidator(path: string) {
  return WHITE_LIST.some(item => {
    if(item === path) return true 
    return false 
  })
}

// const getCookie = (context: any) => {
//   let $cookies
//   // 客户端
//   if (process.client) {
//     $cookies = context.$cookies
//   }
//   // 服务端
//   if (process.server) {
//     $cookies = context.app.$cookies
//   }
//   return $cookies
// }

export function redirectPage(context: any, login: boolean=false) {
  const { app, redirect } = context
  if(login) {
    return app.router.push({
      path: "/login"
    })
  }
  const current = app.router.history.current
  const { query } = current 
  const { redirect: redirectData } = query || {}

  redirect(redirectData || {
    path: "/home"
  })
}

export default async function (context: any) {
  const { app, redirect, $API_CUSTOMER } = context
  const [ err ] = await withTry($API_CUSTOMER.getUserInfo)()
  // ! 暂时拿不到新加的cookie，所以先不用
  // const cookiesToken = getCookie(context).get('a6a7420d799ace72fefb1de7ec0be12f0ae900b29dad50ea9ebf832d999fc7d4')
  const current = app.router.history.current
  const pending = app.router.history.pending
  const { path } = current 

  const toValidPath = pending ? pending.path : path 

  if (!err) {
    if(path.includes("login") && !pending) {
      redirect({
        path: "/home"
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
  }else if(!toValidPath.includes("login") && !pathWhiteValidator(toValidPath)) {
    redirect({
      path: "/login",
    })
  }
  
}