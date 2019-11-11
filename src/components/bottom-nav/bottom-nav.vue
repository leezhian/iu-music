<template>
    <div class="nav-container">
        <div class="nav">
            <router-link tag="div"
                         :to="'/' + item.route"
                         class="nav-item"
                         v-for="item in nav"
                         :key="item.id">
                <i :class="['icon', item.icon]"></i>
                <p class="title">{{item.title}}</p>
            </router-link>
        </div>

        <mini-player></mini-player>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                nav: [
                    {
                        id: 1,
                        title: '推荐',
                        route: 'recommend',
                        icon: 'icon-music'
                    },
                    {
                        id: 2,
                        title: '专辑',
                        route: 'album',
                        icon: 'icon-album'
                    },
                    {
                        id: 3,
                        title: '排行榜',
                        route: 'rankinglist',
                        icon: 'icon-rankingList'
                    },
                    {
                        id: 4,
                        title: '我的',
                        route: 'user',
                        icon: 'icon-user'
                    }
                ]
            }
        },
        methods: {}
    }
</script>

<style scoped lang="scss" rel="stylesheet">
    @import "static/scss/variable.scss";

    .nav-container {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 1.2rem;

        .nav {
            display: flex;
            align-items: center;
            width: 100%;
            height: 1.2rem;
            background-color: $color-nav-background;

            .nav-item {
                display: flex;
                flex-flow: column;
                align-items: center;
                justify-content: center;
                width: 25%;
                height: 100%;
                text-align: center;

                .icon {
                    font-size: $font-size-large;
                    font-family: iconfont;
                }

                .title {
                    text-align: center;
                }

                &.router-link-active {
                    color: $color-font-theme;
                }
            }
        }
    }
</style>