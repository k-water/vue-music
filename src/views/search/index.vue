<template>
  <div class="search">
    <div class="search-box-wrapper">
      <!--searchBox query变化时派发query事件 search component监听该事件获取query值-->
      <!--search component将该值传递给suggest component-->
      <!--suggest component 监听到query值的变化调用search函数-->
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query">
      <div class="shortcut">
        <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li class="item" 
              v-for="item in hotkey" 
              :key="item.key"
              @click="addQuery(item.k)"
            >
              <span>{{item.k}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="search-result" v-show="query">
      <suggest 
        :query="query" 
        @listScroll="blurInput"
        @select="saveSearch"
      >
      </suggest>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import SearchBox from 'base/search-box/search-box'
  import { ERR_OK } from 'api/config'
  import { getHotKey } from 'api/search'
  import Suggest from 'components/suggest/suggest'
  import { mapActions } from 'vuex'
  export default {
    components: {
      SearchBox,
      Suggest
    },
    data() {
      return {
        hotkey: [],
        query: ''
      }
    },
    created() {
      this._getHotKey()
    },
    methods: {
      ...mapActions([
        'saveSearchHistory'
      ]),
      saveSearch() {
        this.saveSearchHistory(this.query)
      },
      blurInput() {
        this.$refs.searchBox.blur()
      },
      onQueryChange(query) {
        this.query = query
      },
      addQuery(query) {
        this.$refs.searchBox.setQuery(query)
      },
      _getHotKey() {
        getHotKey().then(res => {
          if (res.code === ERR_OK) {
            this.hotkey = res.data.hotkey.slice(0, 10)
          }
        })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>