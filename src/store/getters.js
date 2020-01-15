export const recordDetail = state => state.recordDetail;

export const isPlay = state => state.isPlay;

export const fullPlayer = state => state.fullPlayer;

export const playlist = state => state.playlist;

// export const loopList = state => state.loopList;

export const mode = state => state.mode;

export const currentIndex = state => state.currentIndex;
// 当前播放歌曲信息
export const currentSong = (state) => {
    return state.playlist[state.currentIndex] || {}
};

// 获取用户token
export const userToken = state => state.token;