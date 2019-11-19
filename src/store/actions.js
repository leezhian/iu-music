import * as types from './mutation-types';

export const selectPlay = function ({commit}, {list, index}) {
    commit(types.SET_PLAYLIST, list);
    // commit(types.SET_LOOP_LIST, list);
    commit(types.SET_CURRENT_INDEX, index);
    commit(types.SET_FULL_SCREEN, true);
    commit(types.UPDATE_PLAY_STATE, true);
};