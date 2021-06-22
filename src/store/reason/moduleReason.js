/*=========================================================================================
  File Name: moduleTodo.js
  Description: Todo Module
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import axios from '@/axios.js'

export default {
  namespaced: true,
  state: {
    reason: []
  },
  mutations: {
    FETCH_REASONS (state, payload) {
      state.reason = payload
    },
    ADD_NEW_REASON (state, payload) {
      state.reason.push(payload)
    }
  },
  actions: {
    fetchReasons ({ commit }) {
      axios.get('api/reason')
        .then((response) => {
          commit('FETCH_REASONS', response.data)
        })
        .catch((error) => {
          console.error(error.response)
        })
    },
    createReason ({ commit }, payload) {
      axios.post('api/reason/create', payload)
        .then((response) => {
          commit('ADD_NEW_REASON', response.data.data)
        })
        .catch((error) => {
          console.log(error)
        })
      console.log(payload)
    }
  },
  getters: {
    getReasons: state => state.reason
  }
}
