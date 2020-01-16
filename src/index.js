import 'static/js/replaceFontSize';

import Vue from 'vue';
import {Toast} from 'vant';

Vue.use(Toast);

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
// 加密
import rsa from 'static/js/rsa';

rsa.install(Vue);

fastclick.attach(document.body);

Vue.use(VueLazyload, {
  loading: loadImg
});

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
});
