import * as types from './mutation-types';

const mutations = {
  [types.SET_RECORD_DETAIL](state, detail) {
    state.recordDetail = detail;
  },
  [types.UPDATE_PLAY_STATE](state, flag) {
    state.isPlay = flag;
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullPlayer = flag;
  },
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list;
  },
  [types.SET_LOOP_LIST](state, list) {
    state.loopList = list;
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode;
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index;
  },
  [types.SET_CURRENT_LYRIC](state, lyricObj) {
    state.playlist[lyricObj.index].lyric = lyricObj.data.lyric;
  },
  [types.SET_USER_TOKEN](state, token) {
    state.token = token;
  },
  [types.SET_USER_INFO](state, info) {
    state.userInfo = info;
  },
  [types.UPDATE_LIKE](state, type) {
    if (type < 3) {
      // 修改歌单专辑的喜欢状态
      // 因为对象引用一样，所有上一个页面的列表同步修改，不用刷新上一个页面
      state.recordDetail.isLike = !state.recordDetail.isLike;
    } else {
      // 修改单曲的喜欢状态
      state.playlist[state.currentIndex].isLike = !state.playlist[state.currentIndex].isLike;
    }
  }
};

export default mutations;