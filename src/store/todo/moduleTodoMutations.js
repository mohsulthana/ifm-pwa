/*=========================================================================================
  File Name: moduleTodoMutations.js
  Description: Todo Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  SET_TODO_SEARCH_QUERY (state, query) {
    state.todoSearchQuery = query
  },
  UPDATE_TODO_FILTER (state, filter) {
    state.todoFilter = filter
  },

  // API
  SET_TASKS (state, tasks) {
    state.tasks = tasks
  },
  SET_SINGLE_TASK (state, task) {
    state.task = task
  },
  ADD_TASK (state, task) {
    console.log(task)
    state.tasks.push(task.data[0])
  },
  DELETE_TASK (state, task) {
    console.log(task)
    const taskIndex = state.tasks.findIndex((u) => u.id === task)
    state.tasks.splice(taskIndex, 1)
  },
  UPDATE_TASK (state, task) {
    const taskIndex = state.tasks.findIndex((t) => t.id === task.id)
    Object.assign(state.tasks[taskIndex], task)
  },
  UPDATE_PHOTO_BEFORE (state, photo) {
    state.task.before_work = photo
    state.task.status = 'On Progress'
  },
  UPDATE_PHOTO_AFTER (state, photo) {
    state.task.after_work = photo
    state.task.status = 'Done'
  },
  ADD_TASK_EVENTS (state, events) {
    state.events = events
  }
}
