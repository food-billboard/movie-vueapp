import { Plugin } from '@nuxt/types'
import { withTry } from '../../utils/tool'
import { redirectPage } from '../../middleware/auth'
import { request as requestWrapper } from './utils'

const UserServePlugin: Plugin = (context, inject) => {
  const request = requestWrapper(context)
  const { store } = context 

  inject("API_USER", {
    // 跑马灯
    getNotice() {
      return request("/api/user/home/notice")
    },
    // 轮播图
    getSwiper() {
      return request("/api/user/home/swiper")
    },
    // 首页分类grid
    getClassifyIconList(params: API_USER.IGetHomeClassifyList) {
      return request("/api/user/movie/classify/specDropList", {
        params
      })
    },
    // 首页每日上新  
    getDaily(params: API_USER.IGetHomeDailyList) {
      return request("/api/user/home/daily", {
        params
      })
    },
    // 首页排行榜列表
    getHomeRankList(params: API_USER.IGetHomeDailyList) {
      return request("/api/user/home/rank", {
        params 
      })
    },
    logout() {
      store.commit("user/logout")
      redirectPage(context, true)
      return request("/api/user/logon/signout", {
        method: "POST"
      })
    },
    async login(data: API_USER.IPostLoginParams) {
      const result = await request("/api/user/logon/account", {
        method: "POST",
        data: {
          ...data,
          env: process.env.NODE_ENV === "production" ? "prod" : "dev"
        }
      })
      store.commit("user/fetchUserInfo", result || {})
      redirectPage(context)
      return result 
    },
    async register(data: API_USER.IPostRegisterParams) {
      const [ err, value ] = await withTry(request)("/api/user/logon/register", {
        method: "POST",
        data
      })
      if(value) { 
        redirectPage(context)
        return value 
      }
      return Promise.reject(err)
    },
    forget(data: API_USER.IPutForgetParams) {
      return request("/api/user/logon/forget", {
        method: "PUT",
        data
      })
    },
    sendEmail(data: API_USER.IPostEmailParams) {
      return request("/api/user/logon/email", {
        method: "POST",
        data
      })
    }
  })
}

export default UserServePlugin