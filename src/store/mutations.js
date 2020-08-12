import * as types from './mutationTypes.js'

export default {
  [types.SET_USERNAME](state, username){
    state.username = username
  },
  [types.SET_CART_SUM](state, cartCount){
    state.cartCount = cartCount
  }
}
