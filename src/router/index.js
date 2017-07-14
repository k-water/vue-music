import Vue from 'vue'
import Router from 'vue-router'

import Recommend from 'views/recommend'
import Singer from 'views/singer'
import Search from 'views/search'
import Rank from 'views/rank'
import SingerDetail from 'views/singer/details'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/recommend',
    name: '主页'
  }, {
    path: '/recommend',
    component: Recommend

  }, {
    path: '/singer',
    component: Singer,
    children: [{
      path: '/singer/:id',
      component: SingerDetail
    }]
  }, {
    path: '/search',
    component: Search

  }, {
    path: '/rank',
    component: Rank
  }]
})