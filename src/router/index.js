import Vue from 'vue';
import Router from 'vue-router';
import {Toast} from "vant";

import Recommend from 'components/recommend/recommend.vue';
import Album from 'components/album/album.vue';
import Playlist from 'components/playlist/playlist.vue';
import RankingList from 'components/rankingList/rankingList';
import User from 'components/user/user';
import Login from 'components/login/login';

import recordDetail from 'components/recordDetail/recordDetail';
import RecentList from 'components/recentList/recentList';
import Info from 'components/info/info';
import Error from 'components/error/error';

import store from '../store';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend',
      meta: {
        title: '推荐',
        // 是否缓存
        keepAlive: true
      }
    },
    {
      name: 'recommend',
      path: '/recommend',
      component: Recommend,
      meta: {
        title: '推荐',
        keepAlive: true
      },
      children: [
        {
          name: 'playlist',
          path: 'playlist',
          component: Playlist,
          children: [
            {
              path: ':id',
              component: recordDetail
            }
          ]
        },
      ]
    },
    {
      name: 'album',
      path: '/album',
      component: Album,
      meta: {
        title: '专辑',
        keepAlive: true
      },
      children: [
        {
          path: ':id',
          component: recordDetail
        }
      ]
    },
    {
      name: 'rankinglist',
      path: '/rankinglist',
      component: RankingList,
      meta: {
        title: '排行榜',
        keepAlive: true
      }
    },
    {
      name: 'user',
      path: '/user',
      component: User,
      meta: {
        title: '我的',
        keepAlive: false
      },
      children: [
        {
          name: 'userInfo',
          path: 'info',
          component: Info
        },
        {
          name: 'userList',
          path: ':type',
          component: RecentList
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: Login,
      meta: {
        title: '登录与注册',
        keepAlive: true
      }
    },
    {
      path: '*',
      component: Error,
      meta: {
        title: 'error',
      }
    }
  ],
  mode: 'history'
});

// 全局前置守卫，to即将要到的路由，from正要离开的路由
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = 'IU music -' + to.meta.title;
  }

  if (to.name == 'userInfo' || to.name == 'userList') {
    // 判断是否登录
    if (store.state.token) {
      next();
    } else {
      Toast('请先登录');
      if (from.fullPath != '/user') {
        next({
          path: '/user'
        });
      }
    }
  } else {
    next();
  }
});

export default router;