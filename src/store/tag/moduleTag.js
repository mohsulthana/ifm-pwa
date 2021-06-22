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
    tag: []
  },
  mutations: {
    FETCH_TAGS (state, payload) {
      state.tag = payload
    },
    ADD_NEW_TAG (state, payload) {
      state.tag.push(payload)
    }
  },
  actions: {
    fetchTags ({ commit }) {
      axios.get('api/tag')
        .then((response) => {
          commit('FETCH_TAGS', response.data)
        })
        .catch((error) => {
          console.error(error.response)
        })
    },
    createTag ({ commit }, payload) {
      axios.post('api/tag/create', payload)
        .then((response) => {
          commit('ADD_NEW_TAG', response.data.data)
        })
        .catch((error) => {
          console.log(error)
        })
      console.log(payload)
    }
  },
  getters: {
    getTags: state => state.tag
  }
}
