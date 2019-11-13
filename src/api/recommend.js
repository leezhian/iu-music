import axios from 'axios';

export async function getSwiperList() {
    const res = await axios.get('/api/recommend/getSwiperList.do');
    return res;
}

export async function getRecommendPlayerList() {
    const res = await axios.get('/api/recommend/getRecommendPlayerList.do');
    return res;
}

export async function getRecommendSongs() {
    const res = await axios.get('/api/recommend/getRecommendSongs.do');
    return res;
}