/*=========================================================================================
  File Name: moduleTodoGetters.js
  Description: Todo Module Getters
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  getTask: state => id => state.tasks.find((task) => console.log(task))
}
