/*=========================================================================================
  File Name: moduleCalendarActions.js
  Description: Calendar Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from '@/axios.js'

export default {
  register ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post('/api/register', payload)
        .then((response) => {
          commit('UPDATE_USER', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  createAdmin ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post('/api/admin/create', payload)
        .then((response) => {
          commit('UPDATE_ADMIN', response.data.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchAdmin ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('api/admin')
        .then((response) => {
          commit('SET_ADMIN', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchUsers ({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get('api/users')
        .then((response) => {
          commit('SET_USERS', response.data)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchUser (context, userId) {
    return new Promise((resolve, reject) => {
      axios.get(`/api/user-management/users/${userId}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  removeRecord ({ commit }, userId) {
    return new Promise((resolve, reject) => {
      axios.delete(`/api/users/delete/${userId}`)
        .then((response) => {
          commit('REMOVE_RECORD', userId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
