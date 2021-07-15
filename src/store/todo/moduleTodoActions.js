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
  setTodoSearchQuery ({ commit }, query) {
    commit('SET_TODO_SEARCH_QUERY', query)
  },
  getTasks ({ commit }, worker_id) {
    return new Promise((resolve, reject) => {
      axios.post('api/task', worker_id)
        .then((response) => {
          commit('ADD_TASK_EVENTS', response.data)
          resolve(response)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  },
  getTasksByProject ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`api/task/getTasksByProject/${payload}`)
        .then((response)  => {
          console.log(response)
          commit('SET_TASKS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchSingleTask ({ commit }, taskId) {
    return new Promise((resolve, reject) => {
      axios.get(`api/task/singleTask/${taskId}`)
        .then((response) => {
          commit('SET_SINGLE_TASK', response.data.task)
          resolve(response)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  },
  fetchTaskForWorker ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`api/task/getTaskForWorker/${payload}`)
        .then((response) => {
          commit('SET_TASKS', response.data)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  addTask ({ commit }, task) {
    return new Promise((resolve, reject) => {
      axios.post('/api/task/create', {task})
        .then((response) => {
          resolve(response.data)
          commit('ADD_TASK', response.data)
        })
        .catch((error) => { reject(error) })
    })
  },
  deleteTask ({ commit }, taskId) {
    return new Promise((resolve, reject) => {
      axios.post(`/api/task/delete/${taskId}`)
        .then((response) => {
          console.log(response)
          commit('DELETE_TASK', taskId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  updateTask ({ commit }, task) {
    return new Promise((resolve, reject) => {
      axios.post(`/api/task/update/${task.id}`, task)
        .then((response) => {
          commit('UPDATE_TASK', response.data.task)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  updatePhotoBeforeWork ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`/api/task/updateBeforeWork/${payload.id}`, payload.data)
        .then((response) => {
          commit('UPDATE_PHOTO_BEFORE', response.data.photo)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  updatePhotoAfterWork ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`/api/task/updateAfterWork/${payload.id}`, payload.data)
        .then((response) => {
          console.log(response)
          commit('UPDATE_PHOTO_AFTER', response.data.photo)
          resolve(response)
        })
        .catch((error) => {
          console.error(error)
          reject(error)
        })
    })
  },
  // eslint-disable-next-line no-unused-vars
  verifyToken ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post('/api/task/verifyToken', payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error.response)
        })
    })
  }
}
