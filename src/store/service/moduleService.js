/*=========================================================================================
  File Name: moduleTodo.js
  Description: Todo Module
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import state from './moduleServiceState.js'
import mutations from './moduleServiceMutations.js'
import actions from './moduleServiceActions.js'
import getters from './moduleServiceGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
