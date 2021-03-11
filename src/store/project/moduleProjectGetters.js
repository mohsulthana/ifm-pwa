/*=========================================================================================
  File Name: moduleTodoGetters.js
  Description: Todo Module Getters
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  getProject: state => (id) => state.project.find((project) => project.id == id),
  getProjects: state => state.project,
  getSingleProject: state => state.singleProject
  // getTodosBySection: state => (sectionId) => state.todoArray.filter((task) => task.sectionId == sectionId),
}
