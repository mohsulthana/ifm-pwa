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
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

import moduleTodo from './todo/moduleTodo.js'
import moduleProject from './project/moduleProject.js'
import moduleService from './service/moduleService.js'
import moduleComplain from './complain/moduleComplain.js'
import moduleTag from './tag/moduleTag.js'
import moduleReason from './reason/moduleReason.js'
// import moduleEmail from './email/moduleEmail.js'
import moduleUsers from './user-management/moduleUserManagement.js'
import moduleAuth from './auth/moduleAuth.js'
import moduleECommerce from './eCommerce/moduleECommerce.js'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  getters,
  mutations,
  state,
  actions,
  modules: {
    todo: moduleTodo,
    project: moduleProject,
    service: moduleService,
    complain: moduleComplain,
    tag: moduleTag,
    reason: moduleReason,
    user: moduleUsers,
    auth: moduleAuth,
    eCommerce: moduleECommerce
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [vuexLocal.plugin]
})
