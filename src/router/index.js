import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Recommend = resolve => {
  import('views/recommend').then(module => {
    resolve(module)
  })
}

const Singer = resolve => {
  import('views/singer').then(module => {
    resolve(module)
  })
}

const Search = resolve => {
  import('views/search').then(module => {
    resolve(module)
  })
}

const Rank = resolve => {
  import('views/rank').then(module => {
    resolve(module)
  })
}

const SingerDetail = resolve => {
  import('views/singer/details').then(module => {
    resolve(module)
  })
}

const RecommendDetail = resolve => {
  import('views/recommend/details').then(module => {
    resolve(module)
  })
}

const RankDetail = resolve => {
  import('views/rank/details').then(module => {
    resolve(module)
  })
}

const UserCenter = resolve => {
  import('components/userCenter/userCenter').then(module => {
    resolve(module)
  })
}

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