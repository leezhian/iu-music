<template>
    <div class="recentList-page" name="page">
        <div class="top">
            <div class="goToBack icon-back" @click="handleBack"></div>
            <p class="title">我喜欢的</p>
        </div>

        <div class="nav">
            <div :class="['item', {'active': navActiveId == item.id}]"
                 v-for="item in nav"
                 :key="item.id"
                 @click="handleClickNav(item)">
                {{item.title}}
            </div>
        </div>

        <div class="tools-wrapper">
            <div class="play-btn">
                <i class="icon-pause"></i>
                <span class="title">全部播放 (11)</span>
            </div>
        </div>

        <scroll class="song-wrap"
                :watch-data="songList"
                ref="list">
            <div>
                <song-list :song-list="songList"></song-list>
            </div>
        </scroll>
    </div>
</template>

<script>
    import songList from "common/song-list/song-list";

    export default {
        data() {
            return {
                nav: [
                    {
                        id: 1,
                        title: '歌曲'
                    },
                    {
                        id: 2,
                        title: '专辑'
                    },
                    {
                        id: 3,
                        title: '歌单'
                    }
                ],
                navActiveId: 1,
                songList: []
            }
        },
        methods: {
            handleBack() {
                this.$router.go(-1);
            },
            handleClickNav(navItem) {
                this.navActiveId = navItem.id;
            }
        },
        components: {
            songList
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet">
    @import "static/scss/variable.scss";
    @import "static/scss/mixin.scss";

    .recentList-page {
        position: fixed;
        z-index: 50;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        background-color: $color-background;
    }

    .top {
        display: flex;
        align-items: center;
        position: relative;
        width: 100%;
        height: .8rem;
        background-color: rgba(147, 112, 219, .3);

        .goToBack {
            position: absolute;
            top: 0;
            left: 0;
            width: .8rem;
            height: .8rem;
            font-size: $font-size-medium;
            font-family: iconfont;
            text-align: center;
            line-height: .8rem;
        }

        .title {
            flex-grow: 1;
            text-align: center;
            font-size: $font-size-medium;
        }
    }

    .nav {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: .8rem;
        background-color: rgba(147, 112, 219, .3);

        .item {
            position: relative;
            flex-grow: 1;
            height: 100%;
            line-height: .8rem;
            text-align: center;
            font-size: $font-size-medium;
            overflow: hidden;

            &.active {
                color: $color-font-theme;

                &::before {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 30%;
                    height: 2px;
                    border-radius: 2px;
                    background-color: $color-font-theme;
                }
            }
        }
    }

    .tools-wrapper {
        padding: .2rem;

        .play-btn {
            display: flex;
            align-items: center;
            color: $color-font-theme;

            .icon-pause {
                font-family: iconfont;
                font-size: $font-size-large-x;
            }

            .title {
                margin-left: .1rem;
                font-size: $font-size-medium;
            }
        }
    }

    .song-wrap {
        height: 100%;
        overflow: hidden;
    }

    .page-enter-active, .page-leave-active {
        transition: all .3s;
    }

    .page-enter, .page-leave-to {
        transform: translateX(100%);
    }
</style>