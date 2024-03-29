/*=========================================================================================
  File Name: moduleCalendarGetters.js
  Description: Calendar Module Getters
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


const getters = {
  getAdmin: state => (id) => {
    return state.admin.find(item => item.id === id)
  },
  getUsers: state => state.users,
  getWorkers: state => state.workers
}

export default getters