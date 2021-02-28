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
    console.log(payload)
    return new Promise((resolve, reject) => {
      axios.get('api/task')
        .then((response)  => {
          commit('SET_TASKS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
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
  fetchTags ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('/api/apps/todo/tags')
        .then((response) => {
          commit('SET_TAGS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  addTask ({ commit }, task) {
    return new Promise((resolve, reject) => {
      axios.post('/api/task/create', {task})
        .then((response) => {
          commit('ADD_TASK', Object.assign(task, {id: response.data.id}))
          resolve(response)
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
  updateStatus ({ commit }) {
    console.log(commit)
  }
}
