import { APP_COLOR_KEY, defaultColor } from '@/utils/color'


export const state = () => ({
  [APP_COLOR_KEY]: {
    color: defaultColor(),
    mode: "0" 
  }
})

export const mutations = {
  changeColor(state: any, payload: any) {
    state[APP_COLOR_KEY] = {
      ...state[APP_COLOR_KEY] || {},
      ...payload
    }
  }
}

