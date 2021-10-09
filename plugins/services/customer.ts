import { Plugin } from '@nuxt/types'
import { request as requestWrapper } from './utils'

const UserServePlugin: Plugin = (context, inject) => {
  const request = requestWrapper(context)

  inject("API_CUSTOMER", {
    getUserInfo() {
      return request("/api/customer/manage")
    }
  })
}

export default UserServePlugin