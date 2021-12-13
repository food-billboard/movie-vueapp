import { APP_COLOR_KEY, defaultColor } from '@/utils/color'


export const state = () => ({
  [APP_COLOR_KEY]: {
    color: defaultColor(),
    mode: "0" 
  },
  actor: {
    expire: Date.now() - 1000,
    value: []
  },
  language: {
    expire: Date.now() - 1000,
    value: []
  },
  director: {
    expire: Date.now() - 1000,
    value: []
  },
  district: {
    expire: Date.now() - 1000,
    value: []
  },
  classify: {
    expire: Date.now() - 1000,
    value: []
  },
})

export const mutations = {
  changeColor(state: any, payload: any) {
    state[APP_COLOR_KEY] = {
      ...state[APP_COLOR_KEY] || {},
      ...payload
    }
  },
  cacheIndexData(state: any, payload: any) {
    const { key, value } = payload
    state[key] = {
      value,
      expire: Date.now() + 1000 * 60 * 60 
    } 
  }
}

