import { merge } from 'lodash'
import { store as AuthStore, mutations as AuthMutations } from './auth'

export const store = () => {
  return merge({}, AuthStore())
}

export const mutations = merge({}, AuthMutations)