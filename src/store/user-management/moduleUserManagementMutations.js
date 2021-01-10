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
  UPDATE_USER (state, user) {
    state.users.push(user)
  },
  UPDATE_ADMIN (state, admin) {
    state.admin.push(admin)
  },
  REMOVE_RECORD (state, itemId) {
    const userIndex = state.users.findIndex((u) => u.id === itemId)
    const adminIndex = state.admin.findIndex((u) => u.id === itemId)
    state.users.splice(userIndex, 1)
    state.admin.splice(adminIndex, 1)
  }
}
