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
  fetchProjects ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('api/project')
        .then((response)  => {
          commit('SET_PROJECT', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchProjectByCustomer ({ commit }, customerId) {
    return new Promise((resolve, reject) => {
      axios.delete(`/api/project/projectByCustomer/${customerId}`)
        .then((response) => {
          commit('SET_PROJECT', response.data)
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
  addProject ({ commit }, project) {
    return new Promise((resolve, reject) => {
      axios.post('/api/project/create', {project})
        .then((response) => {
          commit('ADD_PROJECT', Object.assign(project, {id: response.data.id}))
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
