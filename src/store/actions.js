import * as types from './mutationTypes.js'
export default {
  saveUserName({commit}, username){
    commit(types.SET_USERNAME, username)
  },
  setCartSum({commit}, num){
    commit(types.SET_CART_SUM, num)
  }
}
