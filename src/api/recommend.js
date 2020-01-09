import {_get} from 'static/js/http';

export async function getSwiperList() {
    const res = await _get({url: '/v1/recommend/getBanner.do'});
    return res;
}

export async function getRecommendPlayerList() {
    const res = await _get({url: '/v1/recommend/getRecommendPlayerList.do'});
    return res;
}

export async function getRecommendSongs() {
    const res = await _get({url: '/v1/recommend/getRecommendSongs.do'});
    return res;
}