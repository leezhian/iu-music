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

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/recommend'
        },
        {
            name: 'recommend',
            path: '/recommend',
            component: Recommend,
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
            component: RankingList
        },
        {
            name: 'user',
            path: '/user',
            component: User,
            children: [
                {
                    path: ':type',
                    component: RecentList
                }
            ]
        },
        {
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            path: '*',
            component: Error
        }
    ],
    mode: 'history'
});
