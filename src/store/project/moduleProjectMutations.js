/*=========================================================================================
  File Name: moduleTodoMutations.js
  Description: Todo Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  SET_PROJECT (state, project) {
    state.project = project
  },
  REMOVE_RECORD (state, projectId) {
    const projectIndex = state.project.findIndex((u) => u.id === projectId)
    state.project.splice(projectIndex, 1)
  },
  ADD_PROJECT (state, project) {
    state.project.push(project)
  },
  SET_SINGLE_PROJECT (state, project) {
    state.singleProject = project
  },
  UPDATE_PROJECT (state, payload) {
    console.log(payload.project)
    console.log(state.project)
    const projectIndex = state.project.findIndex((u) => u.id === payload.id)
    console.log(projectIndex)
    state.project[projectIndex] = payload.project
    console.log(state.project)
  }
}
