/*=========================================================================================
  File Name: moduleTodo.js
  Description: Todo Module
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import state from './moduleComplainState.js'
import mutations from './moduleComplainMutations.js'
import actions from './moduleComplainActions.js'
import getters from './moduleComplainGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
