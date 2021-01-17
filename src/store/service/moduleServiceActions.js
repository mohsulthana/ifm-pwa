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
  fetchServices ({ commit }, userId) {
    return new Promise((resolve, reject) => {
      axios.get(`api/service/index/${userId}`)
        .then((response)  => {
          commit('SET_SERVICE', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  removeRecord ({ commit }, projectId) {
    return new Promise((resolve, reject) => {
      axios.delete(`/api/project/delete/${projectId}`)
        .then((response) => {
          commit('REMOVE_RECORD', projectId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  addService ({ commit }, service) {
    return new Promise((resolve, reject) => {
      axios.post('/api/service/create', {service})
        .then((response) => {
          console.log(response.data)
          commit('ADD_SERVICE', Object.assign(service, {id: response.data.id}))
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
