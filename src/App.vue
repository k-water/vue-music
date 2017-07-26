<template>
  <div id="app" @touchmove.prevent>
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!--播放器全局组件-->
    <player></player>
  </div>
</template>

<script>
  import MHeader from 'components/mHeader/mHeader'
  import Tab from 'components/tab'
  import Player from 'components/player/player'
  export default {
    name: 'app',
    components: {
      MHeader,
      Tab,
      Player
    }
  }
</script>

<style scoped lang="stylus">
  
</style>
