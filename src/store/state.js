import {playMode} from 'static/js/config';

const state = {
    recordDetail: {}, // 专辑或歌单详情
    isPlay: false, // 是否处于播放
    fullPlayer: false, // 是否处于全屏播放器
    playlist: [], // 播放列表
    loopList: [],
    mode: playMode.single, // 当前播放模式
    currentIndex: -1, // 播放歌曲索引
};

export default state;