import Vuex from 'vuex'

import mutations from './mutations.js'
import actions from './actions.js'
import * as getters from './getters.js'
import * as states from './states.js'


export default Vuex.createStore({
  states,
  getters,
  mutations,
  actions,
  modules: {}
})
