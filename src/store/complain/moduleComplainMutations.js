/*=========================================================================================
  File Name: moduleTodoMutations.js
  Description: Todo Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  SET_COMPLAIN (state, complain) {
    state.complains = complain
  },
  REMOVE_RECORD (state, complainId) {
    const complainIndex = state.complains.findIndex((u) => u.id === complainId)
    state.complains.splice(complainIndex, 1)
  },
  ADD_COMPLAIN (state, complain) {
    console.log(complain)
    console.log(state.complains)
    state.complains.push(complain)
    console.log(state.complains)
  }
}
