import { Plugin } from '@nuxt/types'
import { request as requestWrapper } from './utils'

const UserServePlugin: Plugin = (context, inject) => {
  const request = requestWrapper(context)
  const { store } = context 
  // const cookiesUtils: any = app.$cookies 

  inject("API_USER", {
    getNotice() {
      return request("/api/user/home/notice")
    },
    logout() {
      store.commit("user/logout")
      return request("/api/user/logon/signout")
    },
    login(data: API_USER.IPostLoginParams) {
      return request("/api/user/logon/account", {
        method: "POST",
        data
      })
    },
    register(data: API_USER.IPostRegisterParams) {
      return request("/api/user/logon/register", {
        method: "POST",
        data
      })
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