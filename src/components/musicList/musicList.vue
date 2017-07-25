<template>
  <div class="music-list">
    <!--返回上一层-->
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <!--歌曲信息-->
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div ref="playBtn" v-show="songs.length>0" class="play" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
    </div>
    <!--滑动辅助层-->
    <div class="bg-layer" ref="layer"></div>
    <!--歌曲列表-->
    <scroll :data="songs" 
      @scroll="scroll"
      :listen-scroll="listenScroll" 
      :probe-type="probeType" 
      class="list" 
      ref="list"
    >
      <div class="song-list-wrapper">
        <song-list 
          :songs="songs" 
          :rank="rank" 
          @select="selectItem"
        >
        </song-list>
      </div>
      <!--加载loading-->
      <div v-show="!songs.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'base/scroll'
  import Loading from 'base/loading'
  import SongList from 'base/songList/songList'
  import {prefixStyle} from 'common/js/dom'
  import {mapActions} from 'vuex'
  import {playListMixin} from 'common/js/mixin'

  const RESERVED_HEIGHT = 40
  const transform = prefixStyle('transform')

  export default {
    mixins: [playListMixin],
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scrollY: 0
      }
    },
    computed: {
      // 加载歌手背景图片
      bgStyle() {
        return `background-image:url(${this.bgImage})`
      }
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
    },
    // 计算获取背景图片高度 设置scroll的偏移值
    mounted() {
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
      this.$refs.list.$el.style.top = `${this.imageHeight}px`
    },
    methods: {
      // 当底部出现mini播放器的时候 重新计算高度
      handlePlayList(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.list.$el.style.bottom = bottom
        this.$refs.list.refresh()
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      back() {
        this.$router.back()
      },
      selectItem(item, index) {
        this.selectPlay({
          list: this.songs,
          index
        })
      },
      random() {
        this.randomPlay({
          list: this.songs
        })
      },
      ...mapActions([
        'selectPlay',
        'randomPlay'
      ])
    },
    watch: {
      scrollY(newVal) {
        let translateY = Math.max(this.minTransalteY, newVal)
        let scale = 1
        let zIndex = 0
        const percent = Math.abs(newVal / this.imageHeight)
        if (newVal > 0) {
          scale = 1 + percent
          zIndex = 10
        }

        this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
        if (newVal < this.minTransalteY) {
          zIndex = 10
          this.$refs.bgImage.style.paddingTop = 0
          this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
          this.$refs.playBtn.style.display = 'none'
        } else {
          this.$refs.bgImage.style.paddingTop = '70%'
          this.$refs.bgImage.style.height = 0
          this.$refs.playBtn.style.display = ''
        }
        // 下拉背景图片伸缩
        this.$refs.bgImage.style[transform] = `scale(${scale})`
        this.$refs.bgImage.style.zIndex = zIndex
      }
    },
    components: {
      Scroll,
      Loading,
      SongList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>