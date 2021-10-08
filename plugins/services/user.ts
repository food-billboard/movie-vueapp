import { Plugin } from '@nuxt/types'
import { request as requestWrapper } from './utils'

const UserServePlugin: Plugin = (context, inject) => {
  const request = requestWrapper(context)

  inject("API_USER", {
    getNotice() {
      return request("/api/user/home/notice")
    },
    logout() {
      return request("/api/user/logon/signout")
    },
    login(data: API_USER.IPostLoginParams) {
      return request("/api/user/logon/account", {
        method: "POST",
        data
      })
    }
  })
}

export default UserServePlugin