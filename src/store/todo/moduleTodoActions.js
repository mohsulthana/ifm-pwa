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
  fetchTasks ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`api/task/getTasks/${payload}`)
        .then((response)  => {
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
          console.log(response)
          commit('SET_TASKS', response.data)
        })
        .catch((error) => {
          console.error(error)
          reject(error)
        })
    })
  },
  addTask ({ commit }, task) {
    return new Promise((resolve, reject) => {
      axios.post('/api/task/create', {task})
        .then((response) => {
          commit('ADD_TASK', Object.assign(task, {id: response.data.id}))
        })
        .catch((error) => { reject(error) })
    })
  },
  deleteTask ({ commit }, task) {
    return new Promise((resolve, reject) => {
      axios.post(`/api/task/delete/${task}`, {task})
        .then((response) => {
          commit('DELETE_TASK', response.data.task)
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
      axios.put(`/api/task/updateBeforeWork/${payload.id}`, payload)
        .then((response) => {
          console.log(response)
          commit('UPDATE_PHOTO_BEFORE', response.data.photo.before_work)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  updatePhotoAfterWork ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.put(`/api/task/updateAfterWork/${payload.id}`, payload)
        .then((response) => {
          console.log(response)
          commit('UPDATE_PHOTO_AFTER', response.data.photo.after_work)
          resolve(response)
        })
        .catch((error) => {
          console.error(error)
          reject(error)
        })
    })
  }
}
