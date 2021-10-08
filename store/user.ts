// import { store as AuthStore, mutations as AuthMutations } from './auth'

export const state = () => {
  return {
    userInfo: null 
  }
}

export const mutations = {
  logout(state: any) {
    state.user.userInfo = null 
  },
  login() {
    
  }
}