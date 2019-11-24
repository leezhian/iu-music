import * as types from './mutation-types';
import {getLyric} from 'api/album';
import {Base64} from 'js-base64';

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
            return item.id == res.data.id
        });
        if (index > -1) {
            res.data.lyric = Base64.decode(res.data.lyric);
            commit(types.SET_CURRENT_LYRIC, {index: index, data: res.data});
        }
    }
};