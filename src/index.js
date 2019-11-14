import 'static/js/replaceFontSize';

import Vue from 'vue';

Vue.config.devtools = true; // 用于调试

import App from './App';
// 处理移动端300毫秒延迟
import fastclick from 'fastclick';
import router from './router/index';
import store from './store';
// 全局样式
import './static/scss/reset.scss';
// 懒加载
import VueLazyload from "vue-lazyload";
import loadImg from 'static/images/default.jpg';

fastclick.attach(document.body);

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

Vue.use(VueLazyload, {
    loading: loadImg
});

new Vue({
    el: '#app',
    render: h => h(App),
    store,
    router
});
