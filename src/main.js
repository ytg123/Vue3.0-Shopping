import { createApp } from 'vue'
import router from './router'
import store from './store'
// import VueLazyload from 'vue-lazyload'
// .use(VueLazyload,{
// 	loading:'/imgs/loading-svg/loading-bar.svg'
// })

import axios from 'axios'

import App from './App.vue'

// axios.interceptors.request.use((res) => {

// },err => {

// })
// import env from './env.js'
// axios.defaults.baseURL = env.baseURL
axios.defaults.timeout = 8000

axios.interceptors.response.use((res) => {
  let result = res.data
  let path = location.hash
  if(result.status === 0){
    return result.data
  }else if(result.status === 10){
    if(path != '#/index'){
      router.push({
        path:'/Login'
      })
      return Promise.reject(result)
    }

  }else {
    alert(result.msg)
    return Promise.reject(result)
  }
},err => {
  return Promise.reject(err)
})
createApp(App).use(router).use(store).mount('#app')
