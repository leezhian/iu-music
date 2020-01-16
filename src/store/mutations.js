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
    }
};

export default mutations;