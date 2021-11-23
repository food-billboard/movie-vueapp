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
    }
  })
}

export default UserServePlugin