import * as types from './mutation-types';

const mutations = {
    [types.SET_RECORD_DETAIL](state, detail) {
        state.recordDetail = detail;
    }
};

export default mutations;