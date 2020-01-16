import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend.vue';
import Album from 'components/album/album.vue';
import Playlist from 'components/playlist/playlist.vue';
import RankingList from 'components/rankingList/rankingList';
import User from 'components/user/user';
import Login from 'components/login/login';

import recordDetail from 'components/recordDetail/recordDetail';
import RecentList from 'components/recentList/recentList';
import Error from 'components/error/error';

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
            },
            children: [
                {
                    path: ':type',
                    component: RecentList,
                    keepAlive: false
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

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = 'IU music -' +to.meta.title;
    }
    next();
});

export default router;