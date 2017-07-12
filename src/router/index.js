import Vue from 'vue'
import Router from 'vue-router'

import Recommend from 'views/recommend'
import Singer from 'views/singer'
import Search from 'views/search'
import Rank from 'views/rank'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend
  },
  {
    path: '/singer',
    component: Singer
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/rank',
    component: Rank
  }
  ]
})
