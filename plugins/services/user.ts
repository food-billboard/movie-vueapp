import { Plugin } from '@nuxt/types'
import { withTry } from '../../utils/tool'
import { redirectPage } from '../../middleware/auth'
import { request as requestWrapper } from './utils'

const UserServePlugin: Plugin = (context, inject) => {
  const request = requestWrapper(context)
  const { store } = context 

  inject("API_USER", {
    getNotice() {
      return request("/api/user/home/notice")
    },
    getSwiper() {
      return request("/api/user/home/swiper")
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
        data
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