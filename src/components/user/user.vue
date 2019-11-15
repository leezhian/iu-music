<template>
    <div class="user-page">
        <div class="switches-wrapper">
            <switchs :switches="switches" :currentIndex="currentIndex"></switchs>
        </div>

        <div ref="playBtn" class="play-btn">
            <i class="icon-smallPlay"></i>
            <span class="title">随机播放全部</span>
        </div>

        <div class="list-wrap">
            <songList :songList="songList" :showNum="false"></songList>
        </div>
    </div>
</template>

<script>
    import Switchs from "common/switchs/switchs";
    import songList from "common/song-list/song-list";

    export default {
        created() {
        },
        data() {
            return {
                currentIndex: 0,
                switches: [
                    {
                        name: '我喜欢的'
                    },
                    {
                        name: '最近听的'
                    }
                ],
                songList: [
                    {
                        id: 1,
                        name: '夜信',
                        singer: 'IU',
                        album: '밤편지'
                    },
                    {
                        id: 2,
                        name: '삐삐 - (BBIBBI)',
                        singer: 'IU',
                        album: '삐삐 - (BBIBBI)'
                    },
                    {
                        id: 3,
                        name: '除了春天 爱情和樱花',
                        singer: 'IU',
                        album: '밤편지'
                    },
                    {
                        id: 4,
                        name: '팔레트 - (Palette)',
                        singer: 'IU',
                        album: 'Palette'
                    },
                    {
                        id: 5,
                        name: '좋은 날 - (好日子)',
                        singer: 'IU',
                        album: 'Real'
                    },
                    {
                        id: 6,
                        name: '囍帖街 (Live) - (原唱:谢安琪)',
                        singer: 'IU',
                        album: 'Covers & Unreleased Songs'
                    },
                    {
                        id: 7,
                        name: '喜欢你 - (原唱：Beyond)',
                        singer: 'IU',
                        album: 'Covers & Unreleased Songs'
                    }
                ]
            }
        },
        components: {Switchs, songList}
    }
</script>

<style scoped lang="scss" rel="stylesheet">
    @import "static/scss/variable.scss";
    @import "static/scss/mixin.scss";

    .user-page {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 1.2rem;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .switches-wrapper {
        margin: .2rem 0 .6rem 0;
    }

    .play-btn {
        width: 3rem;
        padding: .14rem;
        margin: 0 auto;
        border: 1px solid $color-font-theme;
        border-radius: 1rem;
        line-height: $font-size-small;
        text-align: center;
        color: $color-font-theme;

        .icon-smallPlay {
            font-size: $font-size-small;
            font-family: iconfont;
        }

        .title {
            font-size: $font-size-small;
        }
    }

    .list-wrap {

    }

</style>