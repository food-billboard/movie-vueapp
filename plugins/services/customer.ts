import { Plugin } from '@nuxt/types'
import { request as requestWrapper } from './utils'

const UserServePlugin: Plugin = (context, inject) => {
  const request = requestWrapper(context)
  const { store } = context 

  inject("API_CUSTOMER", {
    async getUserInfo() {
      const result = await request("/api/customer/manage")
      store.commit("user/fetchUserInfo", result || {})
      return result 
    },
    getMovieDetail(params: API_CUSTOMER.IGetMovieDetailParams) {
      return request("/api/customer/movie/detail", {
        method: "GET",
        params
      })
    },
    storeMovie(data: API_CUSTOMER.IGetMovieDetailParams) {
      return request("/api/customer/movie/detail/store", {
        method: "PUT",
        data
      })
    },
    cancelStoreMovie(params: API_CUSTOMER.IGetMovieDetailParams) {
      return request("/api/customer/movie/detail/store", {
        method: "DELETE",
        params
      })
    },
    putAvatar(data: API_CUSTOMER.IGetMovieDetailParams) {
      return request("/api/customer/manage/info/avatar", {
        method: "PUT",
        data
      })
    },
    putUsername(data: API_CUSTOMER.IPutUsernameParams) {
      return request("/api/customer/manage/info/name", {
        method: "PUT",
        data
      })
    },
    // 用户反馈
    postFeedback(data: API_CUSTOMER.IPutFeedbackParams) {
      return request("/api/customer/manage/feedback", {
        method: "POST",
        data
      })
    },
    // 用户反馈预查
    feedbackCheck() {
      return request("/api/customer/manage/feedback/precheck", {
        method: "GET"
      })
    },
  })
}

export default UserServePlugin