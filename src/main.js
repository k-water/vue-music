// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'babel-polyfill'
import fastclick from 'fastclick'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import './common/stylus/index.styl'
import store from './store'
// import axios from './axios'

// Vue.use(axios)
Vue.use(VueLazyLoad, {
  loading: require('./components/mHeader/logo@2x.png')
})
Vue.config.productionTip = false
fastclick.attach(document.body)
  /* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})