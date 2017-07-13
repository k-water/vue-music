// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import fastclick from 'fastclick'
import App from './App'
import router from './router'
import './common/stylus/index.styl'
// import axios from './axios'

// Vue.use(axios)
Vue.config.productionTip = false
fastclick.attach(document.body)
  /* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})