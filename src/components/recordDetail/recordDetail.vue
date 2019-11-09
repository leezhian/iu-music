<template>
    <transition name="page">
        <div class="record-page">
            <cover :hasBack="true">
                <div class="cover-container">
                    <div class="title">专辑</div>
                    <div class="play-btn">
                        <i class="icon icon-smallPlay"></i>
                        <span class="btn-text">播放</span>
                    </div>
                </div>
            </cover>

            <song-list :songList="songList"></song-list>
        </div>
    </transition>
</template>

<script>
    import cover from 'common/cover/cover';
    import songList from 'common/song-list/song-list';

    export default {
        data() {
            return {
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
        components: {
            cover,
            songList
        }
    }
</script>

<style scoped rel="stylesheet" lang="scss">
    @import "static/scss/variable.scss";
    .record-page{
        position: fixed;
        z-index: 50;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: $color-background;
    }

    .page-enter-active, .page-leave-active {
        transition: all .3s;
    }

    .page-enter, .page-leave-to {
        transform: translateX(100%);
    }

</style>