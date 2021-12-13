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
    // 小程序信息
    getAppInfo() {
      return request("/api/user/setting/info")
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
    },

    // 分类名称列表
    getClassifyNameList(params: API_USER.IGetHomeClassifyList) {
      return request("/api/user/movie/classify/specDropList", {
        method: "GET",
        params
      })
    },
    // 分类列表
    getClassifyList(params: API_USER.IGetClassifyListParams) {
      return request("/api/user/movie/classify", {
        method: "GET",
        params
      })
    },
    // 排行榜名称列表
    getRankNameList(params: API_USER.IGetRankNameListParams) {
      return request("/api/user/movie/rank/specDropList", {
        method: "GET",
        params
      })
    },
    // 排行榜
    getRankList(params: API_USER.IGetRankListParams) {
      return request("/api/user/movie/rank", {
        method: "GET",
        params
      })
    },
    // 搜索列表
    getSearchList(params: API_USER.IGetSearchListParams) {
      return request("/api/user/movie/search", {
        method: "GET",
        params
      })
    },
    // 搜索排序字段列表
    getSearchOrderList() {
      return request("/api/user/movie/order", {
        method: "GET",
      })
    },
    // 电影详情  
    getMovieDetail(params: API_USER.IGetMovieDetailParams) {
      return request("/api/user/movie/detail", {
        method: "GET",
        params 
      })
    },
    // 用户关注
    getAttentions(params: API_USER.IGetAttentionsParams) {
      return request("/api/user/customer/attention", {
        method: "GET",
        params
      })
    },
    // 用户粉丝
    getFans(params: API_USER.IGetAttentionsParams) {
      return request("/api/user/customer/fans", {
        method: "GET",
        params
      })
    },
    // 用户浏览
    getBrowserList(params: API_USER.IGetAttentionsParams) {
      return request("/api/user/customer/browser", {
        method: "GET",
        params
      })
    },
    // 用户收藏
    getStoreList(params: API_USER.IGetAttentionsParams) {
      return request("/api/user/customer/store", {
        method: "GET",
        params
      })
    },
    // 用户发布
    getIssueList(params: API_USER.IGetAttentionsParams) {
      return request("/api/user/customer/movie", {
        method: "GET",
        params
      })
    },
    // 用户信息
    getUserInfo(params: { _id: string }) {
      return request("/api/user/customer", {
        method: "GET",
        params
      })
    },
    // 电影详情 简易
    getMovieDetailSimple(params: { _id: string }) {
      return request("/api/user/movie/detail/simple", {
        method: "GET",
        params
      })
    },
    // 电影评论
    getMovieComment(params: API_USER.IGetAttentionsParams) {
      return request("/api/user/movie/detail/comment/list", {
        method: "GET",
        params
      })
    },
    // 评论详情
    getCommentDetail(params: API_USER.IGetAttentionsParams) {
      return request("/api/user/movie/detail/comment/detail", {
        method: "GET",
        params
      })
    },
    // 演员列表
    getActorList(params: { count?: number }) {
      return request("/api/user/movie/actor", {
        method: "GET",
        params
      })
    },
     // 导演列表
     getDirectorList(params: { count?: number }) {
      return request("/api/user/movie/director", {
        method: "GET",
        params
      })
    },
     // 地区列表
     getDistrictList(params: { count?: number }) {
      return request("/api/user/movie/district", {
        method: "GET",
        params
      })
    },
     // 语言列表
     getLanguageList(params: { count?: number }) {
      return request("/api/user/movie/language", {
        method: "GET",
        params
      })
    },
    // 专题列表
    getSpecialList(params: API_USER.IGetAttentionsParams) {
      return request("/api/user/home/special", {
        method: "GET",
        params
      })
    }
  })
}

export default UserServePlugin