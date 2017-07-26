import Vue from 'vue'
import Router from 'vue-router'

import Recommend from 'views/recommend'
import Singer from 'views/singer'
import Search from 'views/search'
import Rank from 'views/rank'
import SingerDetail from 'views/singer/details'
import RecommendDetail from 'views/recommend/details'
import RankDetail from 'views/rank/details'
import UserCenter from 'components/userCenter/userCenter'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/recommend',
    name: '主页'
  }, {
    path: '/recommend',
    component: Recommend,
    children: [{
      path: '/recommend/:id',
      component: RecommendDetail
    }]
  }, {
    path: '/singer',
    component: Singer,
    children: [{
      path: '/singer/:id',
      component: SingerDetail
    }]
  }, {
    path: '/search',
    component: Search,
    children: [{
      path: '/search/:id',
      component: SingerDetail
    }]

  }, {
    path: '/rank',
    component: Rank,
    children: [{
      path: '/rank/:id',
      component: RankDetail
    }]
  }, {
    path: '/user',
    component: UserCenter
  }]
})