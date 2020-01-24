import * as types from './mutation-types';
import {Base64} from 'js-base64';
import {Toast} from "vant";

import {getLyric} from 'api/album';
import {updateName} from 'api/user';
import {updateLike} from 'api/current';

export const selectPlay = function ({commit}, {list, index}) {
  commit(types.SET_PLAYLIST, list);
  // commit(types.SET_LOOP_LIST, list);
  commit(types.SET_CURRENT_INDEX, index);
  commit(types.SET_FULL_SCREEN, true);
  commit(types.UPDATE_PLAY_STATE, true);
};

export const setLyric = async function ({commit, state}, {id}) {
  const res = await getLyric(id);
  if (res.code == 200) {
    if (JSON.stringify(res.data) == '{}') {
      return;
    }
    const index = state.playlist.findIndex(item => {
      return item.id == res.data.songId
    });
    if (index > -1) {
      res.data.lyric = Base64.decode(res.data.lyric);
      commit(types.SET_CURRENT_LYRIC, {index: index, data: res.data});
    }
  }
};

/**
 * 修改用户昵称
 * @param commit
 * @param state
 * @param username 用户昵称
 * @returns {Promise<boolean>}
 */
export const setUsername = async function ({commit, state}, username) {
  const res = await updateName(username);
  if (res.code == 200) {
    const info = Object.assign({}, state.userInfo);
    info.username = username;
    commit(types.SET_USER_INFO, info);
    Toast(res.message);
    return true;
  }
  return false;
}

export const updateLikeIds = async function({commit}, {type, likeId}){
  const res = await updateLike(type, likeId);
  if (res.code == 200) {
    commit(types.UPDATE_LIKE, type);
  }
}