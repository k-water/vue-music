import * as types from './mutation-types'

export const selectPlay = ({ commit, state }, { list, index }) => {
  // 提交设置歌曲列表
  commit(types.SET_SEQUENCE_LIST, list)
    // 设置播放列表
  commit(types.SET_PLAYLIST, list)
    // 设置当前播放歌曲的索引
  commit(types.SET_CURRENT_INDEX, index)
    // 设置播放器状态 全屏 or 小屏
  commit(types.SET_FULL_SCREEN, true)
    // 设置播放状态 播放 or 暂停
  commit(types.SET_PLAYING_STATE, true)
}