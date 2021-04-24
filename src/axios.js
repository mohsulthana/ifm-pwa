// axios
import axios from 'axios'
// import store from './store/index'

const baseURL = 'http://localhost:8080'
// const baseURL = 'https://api.ifm-service.de'

const instance = axios.create({
  baseURL,
  // You can add your headers here
  headers: { 'Content-Type': 'application/json' }
})

const appLoading = document.getElementById('loading-bg')
// if (appLoading) {
//   appLoading.style.display = 'none'
// }

instance.interceptors.request.use(function (config) {
  appLoading.style.display = 'block'
  return config
}, function (error) {
  return Promise.reject(error)
})

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  console.log(response)
  appLoading.style.display = 'none'
  return response
}, function (error) {
  return Promise.reject(error)
})

export default instance