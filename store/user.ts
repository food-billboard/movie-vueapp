// import { store as AuthStore, mutations as AuthMutations } from './auth'

export const state = () => {
  return {
    userInfo: null,
  }
}

export const mutations = {
  logout(state: any) {
    state.userInfo = null 
  },
  fetchUserInfo(state: any, payload: any) {
    state.userInfo = payload
  }
}