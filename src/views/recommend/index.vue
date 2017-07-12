<template>
  <div class="recommend" ref="recommend">
    <div class="recommend-content">
      <div class="slider-wrapper" v-if="recommendList.length">
        <slider>
          <!--slot-->
          <div v-for="item in recommendList" :key="item.key">
            <a :href="item.linkUrl">
              <img :src="item.picUrl"></img>
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul></ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Slider from 'base/slider'
  import { getRecommend } from 'api/recommend'
  import { ERR_OK } from 'api/config'
  export default {
    created () {
      this._getRecommend()
    },
    data() {
      return {
        recommendList: []
      }
    },
    components: {
      Slider
    },
    methods: {
      // jsonp
      _getRecommend () {
        getRecommend().then(res => {
          if (res.code === ERR_OK) {
            this.recommendList = res.data.slider
          }
        })
      }

      // _getRecommend () {
      //   let params = {
      //     g_tk: 5381,
      //     uin: 0,
      //     format: 'json',
      //     inCharset: 'utf-8',
      //     outCharset: 'utf-8',
      //     notice: 0,
      //     platform: 'h5',
      //     needNewCode: 1
      //   }
      //   const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?'
      //   this.$http.get(url, {
      //     params: params
      //   }).then(res => {
      //     console.log(res.data.slider)
      //   }).catch(error => {
      //     console.log(error)
      //   })
      // }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
