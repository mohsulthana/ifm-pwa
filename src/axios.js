import axios from 'axios'

// const baseURL = process.env.VUE_APP_BASE_URL
const baseURL = 'https://api.ifm-service.de'

const instance = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
})

const appLoading = document.getElementById('loading-bg')

instance.interceptors.request.use(function (config) {
  appLoading.style.display = 'block'
  appLoading.style.transition = 'all 2s'
  return config
}, function (error) {
  appLoading.style.display = 'block'
  appLoading.style.transition = 'all 2s'
  return Promise.reject(error)
})

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  appLoading.style.display = 'none'
  appLoading.style.transition = 'all 2s'
  return response
}, function (error) {
  appLoading.style.display = 'none'
  appLoading.style.transition = 'all 2s'
  return Promise.reject(error)
})

export default instance