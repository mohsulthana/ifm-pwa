/*=========================================================================================
  File Name: moduleTodoGetters.js
  Description: Todo Module Getters
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  fetchServices: state => state.service,
  fetchSingleService: state => (id) => state.service.find((element) => element.id == id)
  // getTodosBySection: state => (sectionId) => state.todoArray.filter((task) => task.sectionId == sectionId),
}
