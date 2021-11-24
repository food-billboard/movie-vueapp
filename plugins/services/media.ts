import { Plugin } from '@nuxt/types'
import { request as requestWrapper } from './utils'

const UserServePlugin: Plugin = (context, inject) => {
  const request = requestWrapper(context)

  inject("API_MEDIA", {
    putVideoPoster(data: API_MEDIA.IPutMoviePosterParams) {
      return request("/api/media/video/poster", {
        method: "PUT",
        data: {
          overlap: false,
          ...data,
        }
      })
    },
  })
}

export default UserServePlugin