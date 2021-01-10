import Vue from 'vue'
import { AclInstaller, AclCreate, AclRule } from 'vue-acl'
import router from '@/router'

Vue.use(AclInstaller)

let initialRole = 'editor'

// const userInfo = JSON.parse(localStorage.getItem('userInfo'))
const token = localStorage.getItem('accessToken')
const generatedToken = token ? JSON.parse(atob(token.split('.')[1])) : ''
if (token && generatedToken.data.role) initialRole = generatedToken.data.role.toLowerCase()
export default new AclCreate({
  initial  : initialRole,
  notfound : '/pages/not-authorized',
  router,
  acceptLocalRules : true,
  globalRules: {
    admin  : new AclRule('admin').generate(),
    editor : new AclRule('editor').or('admin').generate(),
    super: new AclRule('super').generate(),
    worker: new AclRule('worker').generate(),
    customer: new AclRule('customer').generate()
  }
})
