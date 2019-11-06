import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend.vue';
import Album from 'components/album/album.vue';
import RankingList from 'components/rankingList/rankingList';
import User from 'components/user/user';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/recommend'
        },
        {
            path: '/recommend',
            component: Recommend
        },
        {
            path: '/album',
            component: Album
        },
        {
            path: '/rankinglist',
            component: RankingList
        },
        {
            path: '/user',
            component: User
        }
    ],
    mode: 'history'
});
