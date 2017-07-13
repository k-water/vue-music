<template>
  <scroll class="list-view" :data="data" ref="listView">
    <ul>
      <li v-for="group in data" class="list-group" :key="group.key" ref="listGroup">
        <h2 class="list-group-title"> {{group.title}} </h2>
        <ul>
          <li class="list-group-item" v-for="item in group.items" :key="item.key">
            <img v-lazy="item.avatar" alt="" class="avatar">
            <span class="name"> {{item.name}} </span>
          </li>
        </ul>
      </li>
    </ul>
    
    <!--右侧快速定位列表-->
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li class="item" v-for="(item, index) in shortcutList" :data-index="index" :key="item.key">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>
<script>
  import Scroll from 'base/scroll'
  import Loading from 'base/loading'
  import { getData } from 'common/js/dom'

  const ANCHOR_HEIGHT = 18
  export default {
    created() {
      this.touch = {}
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    computed: {
      shortcutList() {
        return this.data.map((group) => {
          return group.title.substr(0, 1)
        })
      }
    },
    components: {
      Scroll,
      Loading
    },
    methods: {
      onShortcutTouchStart(e) {
        // 获取当前触摸的index
        let anchorIndex = getData(e.target, 'index')
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = anchorIndex
        this.$refs.listView.scrollToElement(this.$refs.listGroup[anchorIndex], 0)
      },
      onShortcutTouchMove(e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY

        // 向下取整
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        // 获取移动的距离
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta
        this.$refs.listView.scrollToElement(this.$refs.listGroup[anchorIndex], 0)
      }
    }
  }
</script>
<style lang="stylus">
  @import "~common/stylus/variable"

  .list-view
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
