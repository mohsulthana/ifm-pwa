/*=========================================================================================
  File Name: store.js
  Description: Vuex store
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

import moduleTodo from './todo/moduleTodo.js'
import moduleProject from './project/moduleProject.js'
import moduleService from './service/moduleService.js'
// import moduleCalendar from './calendar/moduleCalendar.js'
// import moduleChat from './chat/moduleChat.js'
// import moduleEmail from './email/moduleEmail.js'
import moduleUsers from './user-management/moduleUserManagement.js'
import moduleAuth from './auth/moduleAuth.js'
import moduleECommerce from './eCommerce/moduleECommerce.js'


export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules: {
    todo: moduleTodo,
    project: moduleProject,
    service: moduleService,
    // chat: moduleChat,
    // email: moduleEmail,
    user: moduleUsers,
    auth: moduleAuth,
    eCommerce: moduleECommerce
  },
  strict: process.env.NODE_ENV !== 'production'
})
