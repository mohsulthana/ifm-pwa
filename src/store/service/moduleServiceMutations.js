/*=========================================================================================
  File Name: moduleTodoMutations.js
  Description: Todo Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  SET_SERVICE (state, service) {
    state.service = service
  },
  REMOVE_RECORD (state, serviceId) {
    const serviceIndex = state.service.findIndex((u) => u.id === serviceId)
    state.service.splice(serviceIndex, 1)
  },
  ADD_SERVICE (state, service) {
    console.log(state)
    state.service.service.push(service)
  }
}
