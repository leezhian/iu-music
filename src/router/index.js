import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend.vue';
import Album from 'components/album/album.vue';
import Playlist from 'components/playlist/playlist.vue';
import RankingList from 'components/rankingList/rankingList';
import User from 'components/user/user';

import recordDetail from 'components/recordDetail/recordDetail';
import Error from 'components/error/error';
// import Player from 'components/player/player';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/recommend'
        },
        {
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
            path: '/rankinglist',
            component: RankingList
        },
        {
            path: '/user',
            component: User
        },
        {path: '*', component: Error}
    ],
    mode: 'history'
});
