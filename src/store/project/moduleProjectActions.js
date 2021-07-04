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
          console.log(response)
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
  fetchSingleProject ({ commit }, projectId) {
    axios.get(`api/project/show/${projectId}`)
      .then((response) => {
        commit('SET_SINGLE_PROJECT', response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  },
  fetchProjectFolder ({ commit }, workerId) {
    return new Promise((resolve, reject) => {
      axios.get(`api/project/projectFolder/${workerId}`)
        .then((response) => {
          resolve(response)
        // console.log(commit)
        // commit('SET_SINGLE_PROJECT', response.data)
        })
        .catch((error) => {
          console.error(error)
        })
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
          console.log(response)
          commit('ADD_PROJECT', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  createProjectWorker ({ commit }, project) {
    return new Promise((resolve, reject) => {
      axios.post('/api/project/createProjectWorker', {project})
        .then((response) => {
          console.log(response)
          // commit('ADD_TASK', Object.assign(task, {id: response.data.id}))
        })
        .catch((error) => { console.log(error); reject(error) })
    })
  },
  updateProject ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`/api/project/update/${payload.id}`, payload)
        .then((response) => {
          commit('UPDATE_PROJECT', Object.assign({}, {id: response.data.project.id, project: response.data.project}))
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  updateRating ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`api/project/updateRating/${payload.id}`, {rating: payload.rating})
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  }
}
