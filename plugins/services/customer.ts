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
    // 获取本人关注
    getSelfCustomerAttentions(params: API_CUSTOMER.IGetSelfAttentionParams) {
      return request("/api/customer/manage/attention", {
        method: "GET",
        params
      })
    },
    // 获取用户关注
    getCustomerAttention(params: API_CUSTOMER.IGetSelfAttentionParams & { _id: string }) {
      return request("/api/customer/user/attention", {
        method: "GET",
        params
      })
    },
    // 获取本人粉丝
    getSelfCustomerFans(params: API_CUSTOMER.IGetSelfAttentionParams) {
      return request("/api/customer/manage/fans", {
        method: "GET",
        params
      })
    },
    // 获取用户粉丝
    getCustomerFans(params: API_CUSTOMER.IGetSelfAttentionParams & { _id: string }) {
      return request("/api/customer/user/fans", {
        method: "GET",
        params
      })
    },
    // 关注用户
    putUserAttention(data: { _id: string }) {
      return request("/api/customer/manage/attention", {
        method: "PUT",
        data
      })
    },
    // 取消关注用户
    deleteUserAttention(params: { _id: string }) {
      return request("/api/customer/manage/attention", {
        method: "DELETE",
        params
      })
    },
    // 个人浏览记录
    getSelfBrowser(params: API_CUSTOMER.IGetSelfAttentionParams) {
      return request("/api/customer/manage/movie/browser", {
        method: "GET",
        params
      })
    },
    // 用户浏览记录
    getUserBrowser(params: API_CUSTOMER.IGetSelfAttentionParams & { _id: string }) {
      return request("/api/customer/user/movie/browser", {
        method: "GET",
        params
      })
    },
    // 用户收藏
    getUserStore(params: API_CUSTOMER.IGetSelfAttentionParams & { _id: string }) {
      return request("/api/customer/user/movie/store", {
        method: "GET",
        params
      })
    },
    // 个人收藏
    getSelfStore(params: API_CUSTOMER.IGetSelfAttentionParams) {
      return request("/api/customer/manage/movie/store", {
        method: "GET",
        params
      })
    },
    // 用户发布
    getUserIssue(params: API_CUSTOMER.IGetSelfAttentionParams & { _id: string }) {
      return request("/api/customer/user/movie/issue", {
        method: "GET",
        params
      })
    },
    // 个人发布
    getSelfIssue(params: API_CUSTOMER.IGetSelfAttentionParams) {
      return request("/api/customer/manage/movie", {
        method: "GET",
        params
      })
    },
    // 用户信息
    getAnotherUserInfo(params: { _id: string }) {
      return request("/api/customer/user", {
        method: "GET",
        params
      })
    },
    // 发送电影评论
    postMovieComment(data: API_CUSTOMER.IPostCommentParams) {
      return request("/api/customer/movie/detail/comment/movie", {
        method: "POST",
        data
      })
    },
    // 发送评论
    postComment(data: API_CUSTOMER.IPostCommentParams) {
      return request("/api/customer/movie/detail/comment", {
        method: "POST",
        data
      })
    },
    // 用户评论
    getMovieComment(params: API_USER.IGetAttentionsParams) {
      return request("/api/user/movie/detail/comment/list", {
        method: "GET",
        params
      })
    },
    // 点赞评论
    putMovieCommentLike(data: { _id: string }) {
      return request("/api/customer/movie/detail/comment/like", {
        method: "PUT",
        data
      })
    },
    // 取消点赞评论
    deleteMovieCommentLike(params: { _id: string }) {
      return request("/api/customer/movie/detail/comment/like", {
        method: "DELETE",
        params
      })
    }
  })
}

export default UserServePlugin