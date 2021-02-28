/*=========================================================================================
  File Name: moduleTodoActions.js
  Description: Todo Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from '@/axios.js'

export default {
  fetchComplainsByUser ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`api/complain/complainByCustomer/${payload}`)
        .then((response)  => {
          console.log(response)
          commit('SET_COMPLAIN', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchComplains ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('api/complain')
        .then((response)  => {
          commit('SET_COMPLAIN', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  removeRecord ({ commit }, complainId) {
    return new Promise((resolve, reject) => {
      axios.delete(`/api/complain/delete/${complainId}`)
        .then((response) => {
          commit('REMOVE_RECORD', complainId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  addComplain ({ commit }, complain) {
    return new Promise((resolve, reject) => {
      axios.post('/api/complain/create', {complain})
        .then((response) => {
          console.log(response.data)
          commit('ADD_COMPLAIN', Object.assign(complain, {id: response.data.id}))
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
