

export function setAuthInfo(ctx: any, res: any) {
  let $cookies, $store
  // 客户端
  if (process.client) {
    $cookies = ctx.$cookies
    $store = ctx.$store
  }
  // 服务端
  if (process.server) {
    $cookies = ctx.app.$cookies
    $store = ctx.store
  }
  if ($cookies && $store) {
    // 过期时长 new Date(Date.now() + 8.64e7 * 365 * 10)
    // const expires = $store.state.auth.cookieMaxExpires
    const expires = 100 
    // 设置cookie
    // $cookies.set('userId', res.userId, { expires })
    // $cookies.set('clientId', res.clientId, { expires })
    $cookies.set('token', res.token, { expires })
    // $cookies.set('userInfo', res.user, { expires })
    // 设置vuex
    // $store.commit('auth/UPDATE_USERINFO', res.user)
    // $store.commit('auth/UPDATE_CLIENTID', res.clientId)
    // $store.commit('auth/UPDATE_TOKEN', res.token)
    // $store.commit('auth/UPDATE_USERID', res.userId)
  }
}