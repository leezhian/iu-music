import {_get} from 'static/js/http';

export async function getSwiperList() {
    const res = await _get({url: '/api/recommend/getSwiperList.do'});
    return res;
}

export async function getRecommendPlayerList() {
    const res = await _get({url: '/api/recommend/getRecommendPlayerList.do'});
    return res;
}

export async function getRecommendSongs() {
    const res = await _get({url: '/api/recommend/getRecommendSongs.do'});
    return res;
}