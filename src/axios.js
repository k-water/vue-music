import axios from 'axios'
import Vue from 'vue'

// axios.defaults.baseURL = API.ROOT
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'
axios.defaults.withCredentials = false

axios.interceptors.request.use(function (config) {
  // Do something
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

axios.interceptors.response.use(res => {
  // Do something
}, error => {
  // if (error.response) {
  //   // The request was made, but the server responded with a status code
  //   // that falls out of the range of 2xx
  //   console.log(error.response.data)
  //   console.log(error.response.status)
  //   console.log(error.response.headers)
  // } else {
  //   // Something happened in setting up the request that triggered an Error
  //   console.log('Error', error.message)
  // }
  // console.log(error.config)
  console.log(error)
  return Promise.reject(error)
})

export default {
  install () {
    Vue.prototype.$http = axios
    Vue.http = axios
  }
}
