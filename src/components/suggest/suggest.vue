<template>
  <scroll 
    class="suggest" 
    :data="result"
    :pullUp="pullUp"
    @scrollToEnd="searchMore"
    :beforeScroll="beforeScroll"
    @beforeScroll="listScroll"
    ref="suggest"
  >
    <ul class="suggest-list">
      <li 
        class="suggest-item"
        v-for="item in result"
        :key="item.key"
        @click="selectItem(item)"
      >
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>
<script>
  import { ERR_OK } from 'api/config'
  import { search } from 'api/search'
  import { createSong } from 'common/js/song'
  import Singer from 'common/js/singer'
  import Scroll from 'base/scroll'
  import Loading from 'base/loading'
  import NoResult from 'base/noResult/noResult'

  import { mapMutations, mapActions } from 'vuex'
  const TYPE_SINGER = 'singer'
  const perpage = 20
  export default {
    components: {
      Scroll,
      Loading,
      NoResult
    },
    props: {
      query: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        page: 1,
        result: [],
        pullUp: true,
        hasMore: true,
        beforeScroll: true
      }
    },
    methods: {
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      ...mapActions([
        'insertSong'
      ]),
      refresh() {
        this.$refs.suggest.refresh()
      },
      // scroll 派发 beforeScroll
      // suggest 监听 beforeScroll
      // 同时派发 listScroll
      // search组件监听listScroll派发的事件
      listScroll() {
        this.$emit('listScroll')
      },
      search() {
        this.page = 1
        this.hasMore = true
        this.$refs.suggest.scrollTo(0, 0)
        search(this.query, this.page, this.showSinger, perpage)
          .then(res => {
            if (res.code === ERR_OK) {
              this.result = this._getResult(res.data)
              this._checkHasMore(res.data)
            }
          })
      },
      searchMore() {
        if (!this.hasMore) return
        this.page ++
        search(this.query, this.page, this.showSinger, perpage)
          .then(res => {
            if (res.code === ERR_OK) {
              this.result = this.result.concat(this._getResult(res.data))
              this._checkHasMore(res.data)
            }
          })
      },
      // 判断是否已加载完
      _checkHasMore(data) {
        const song = data.song
        if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
          this.hasMore = false
        }
      },
      selectItem(item) {
        if (item.type === TYPE_SINGER) {
          const singer = new Singer({
            id: item.singermid,
            name: item.singername
          })
          this.$router.push({
            path: `/search/${singer.id}`
          })
          this.setSinger(singer)
        } else {
          this.insertSong(item)
        }
        this.$emit('select')
      },
      getIconCls(item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      getDisplayName(item) {
        if (item.type === TYPE_SINGER) {
          return item.singername
        } else {
          return `${item.name}-${item.singer}`
        }
      },
      _getResult(data) {
        let ret = []

        if (data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }
        if (data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list))
        }

        return ret
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    watch: {
      query() {
        this.search()
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>