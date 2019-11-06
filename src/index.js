import 'static/js/replaceFontSize';

import Vue from 'vue';
import App from './App';
// 处理移动端300毫秒延迟
import fastclick from 'fastclick';
import router from './router/index';
import './static/scss/reset.scss';
// 懒加载
// import VueLazyload from "vue-lazyload";

fastclick.attach(document.body);

// Vue.use(VueLazyload, {
//     loading: require('common/image/default.png')
// })

new Vue({
    el: '#app',
    render: h => h(App),
    // store,
    router
});
