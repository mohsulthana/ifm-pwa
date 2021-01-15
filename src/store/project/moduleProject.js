/*=========================================================================================
  File Name: moduleTodo.js
  Description: Todo Module
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import state from './moduleProjectState.js'
import mutations from './moduleProjectMutations.js'
import actions from './moduleProjectActions.js'
import getters from './moduleProjectGetters.js'

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
