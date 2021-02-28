/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  SET_USERS (state, users) {
    state.users = users
  },
  SET_ADMIN (state, admin) {
    state.admin = admin
  },
  SET_WORKER (state, worker) {
    state.worker = worker
  },
  UPDATE_USER (state, user) {
    state.users = user
  },
  UPDATE_ADMIN (state, admin) {
    state.admin.push(admin)
  },
  UPDATE_WORKER (state, worker) {
    state.worker.push(worker)
  },
  REMOVE_WORKER (state, workerId) {
    const workerIndex = state.worker.findIndex((u) => u.id === workerId)
    state.worker.splice(workerIndex, 1)
  },
  REMOVE_RECORD (state, itemId) {
    const userIndex = state.users.findIndex((u) => u.id === itemId)
    const adminIndex = state.admin.findIndex((u) => u.id === itemId)
    state.users.splice(userIndex, 1)
    state.admin.splice(adminIndex, 1)
  }
}
