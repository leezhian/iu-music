import axios from 'axios';

axios.interceptors.request.use(function (config) {
    const CONFIG_HTTP = 'http://localhost:3001';
    config.url = CONFIG_HTTP + config.url;
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

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