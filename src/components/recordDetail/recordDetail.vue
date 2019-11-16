<template>
    <transition name="player">
        <div class="record-page">
            <cover :has-back="true" :cover-img="this.recordDetail.cover">
                <div class="container" :style="{'background-image': `url(${this.recordDetail.cover})`}" ref="bgImage" >
                    <div class="info">
                        <h3 class="record-name">{{this.recordDetail.albumName}}</h3>
                        <p class="record-singer" v-if="type == 'album'">—— {{this.recordDetail.singer}}</p>
                    </div>
                    <div class="tools">
                        <div class="btn"><i class="icon-pause"></i></div>
                        <div class="btn"><i class="icon icon-cart"></i></div>
                    </div>
                    <p class="desc" v-if="type == 'album'">简介: {{this.recordDetail.description}}</p>
                </div>
            </cover>

            <div class="bg-layer" ref="layer"></div>
            <scroll class="song-wrap"
                    @scroll="scroll"
                    :watch-data="songList"
                    :listen-scroll="listenScroll"
                    :probe-type="probeType"
                    ref="list">
                <div>
                    <song-list :song-list="songList" v-if="songList.length"></song-list>
                </div>
            </scroll>
            <!--            <loading v-else></loading>-->
        </div>
    </transition>
</template>

<script>
    import Scroll from 'common/scroll/scroll';
    import cover from 'common/cover/cover';
    import songList from 'common/song-list/song-list';
    import {mapGetters} from 'vuex';

    import {getSongList} from 'api/album';

    // 返回栏的高度
    const COVER_HEADER_H = window.document.documentElement.style.fontSize.replace(/px/, '') * 0.8;

    export default {
        created() {
            this.listenScroll = true;
            this.probeType = 3;
            this._getSongList();
        },
        mounted() {
            this.coverImgHeight = this.$refs.bgImage.clientHeight; // 专辑图片高度
            this.minTranslateY = -this.coverImgHeight + COVER_HEADER_H; // 最小偏移量，因为往上是负的
            this.$refs.list.$el.style.top = `${this.coverImgHeight}px`; // 初始化默认list的top值
        },
        data() {
            return {
                type: 'album',
                songList: [],
                scrollY: 0
            }
        },
        methods: {
            /**
             * 获取偏移量
             * @param position
             */
            scroll(position) {
                this.scrollY = position.y;
            },
            _getSongList() {
                if (JSON.stringify(this.recordDetail) == {}) {
                    this.$router.push('/album');
                    return;
                }
                // 获取歌曲列表
                getSongList(this.recordDetail.songIds).then(res => {
                    if (res.code == 200) {
                        _.forEach(res.data, item => {
                            let singer = '';
                            if (item.singerList.length > 1) {
                                _.forEach(item.singerList, value => {
                                    singer += value.singerName + '/';
                                });
                            } else {
                                singer = item.singerList[0].singerName + '/';
                            }
                            item.singer = singer.substring(0, singer.length - 1);
                        });

                        // 测试
                        res.data = res.data.concat([{
                            "id": 13,
                            "songName": "Love poem",
                            "albumId": 3,
                            "albumName": "Love poem",
                            "link": "11",
                            "singerList": [{"id": 6, "singerName": "IU"}],
                            "singer": "IU"
                        }, {
                            "id": 14,
                            "songName": "Love poem",
                            "albumId": 3,
                            "albumName": "Love poem",
                            "link": "11",
                            "singerList": [{"id": 6, "singerName": "IU"}],
                            "singer": "IU"
                        }, {
                            "id": 15,
                            "songName": "Love poem",
                            "albumId": 3,
                            "albumName": "Love poem",
                            "link": "11",
                            "singerList": [{"id": 6, "singerName": "IU"}],
                            "singer": "IU"
                        }, {
                            "id": 16,
                            "songName": "Love poem",
                            "albumId": 3,
                            "albumName": "Love poem",
                            "link": "11",
                            "singerList": [{"id": 6, "singerName": "IU"}],
                            "singer": "IU"
                        }, {
                            "id": 17,
                            "songName": "Love poem",
                            "albumId": 3,
                            "albumName": "Love poem",
                            "link": "11",
                            "singerList": [{"id": 6, "singerName": "IU"}],
                            "singer": "IU"
                        }, {
                            "id": 18,
                            "songName": "Love poem",
                            "albumId": 3,
                            "albumName": "Love poem",
                            "link": "11",
                            "singerList": [{"id": 6, "singerName": "IU"}],
                            "singer": "IU"
                        }, {
                            "id": 19,
                            "songName": "Love poem",
                            "albumId": 3,
                            "albumName": "Love poem",
                            "link": "11",
                            "singerList": [{"id": 6, "singerName": "IU"}],
                            "singer": "IU"
                        }, {
                            "id": 20,
                            "songName": "Love poem",
                            "albumId": 3,
                            "albumName": "Love poem",
                            "link": "11",
                            "singerList": [{"id": 6, "singerName": "IU"}],
                            "singer": "IU"
                        }, {
                            "id": 21,
                            "songName": "Love poem",
                            "albumId": 3,
                            "albumName": "Love poem",
                            "link": "11",
                            "singerList": [{"id": 6, "singerName": "IU"}],
                            "singer": "IU"
                        }, {
                            "id": 22,
                            "songName": "Love poem",
                            "albumId": 3,
                            "albumName": "Love poem",
                            "link": "11",
                            "singerList": [{"id": 6, "singerName": "IU"}],
                            "singer": "IU"
                        }, {
                            "id": 23,
                            "songName": "Love poem",
                            "albumId": 3,
                            "albumName": "Love poem",
                            "link": "11",
                            "singerList": [{"id": 6, "singerName": "IU"}],
                            "singer": "IU"
                        }, {
                            "id": 24,
                            "songName": "Love poem",
                            "albumId": 3,
                            "albumName": "Love poem",
                            "link": "11",
                            "singerList": [{"id": 6, "singerName": "IU"}],
                            "singer": "IU"
                        }, {
                            "id": 25,
                            "songName": "Love poem",
                            "albumId": 3,
                            "albumName": "Love poem",
                            "link": "11",
                            "singerList": [{"id": 6, "singerName": "IU"}],
                            "singer": "IU"
                        }, {
                            "id": 26,
                            "songName": "Love poem",
                            "albumId": 3,
                            "albumName": "Love poem",
                            "link": "11",
                            "singerList": [{"id": 6, "singerName": "IU"}],
                            "singer": "IU"
                        }, {
                            "id": 27,
                            "songName": "Love poem",
                            "albumId": 3,
                            "albumName": "Love poem",
                            "link": "11",
                            "singerList": [{"id": 6, "singerName": "IU"}],
                            "singer": "IU"
                        }, {
                            "id": 28,
                            "songName": "Love poem",
                            "albumId": 3,
                            "albumName": "Love poem",
                            "link": "11",
                            "singerList": [{"id": 6, "singerName": "IU"}],
                            "singer": "IU"
                        }, {
                            "id": 29,
                            "songName": "Love poem",
                            "albumId": 3,
                            "albumName": "Love poem",
                            "link": "11",
                            "singerList": [{"id": 6, "singerName": "IU"}],
                            "singer": "IU"
                        }, {
                            "id": 30,
                            "songName": "Love poem",
                            "albumId": 3,
                            "albumName": "Love poem",
                            "link": "11",
                            "singerList": [{"id": 6, "singerName": "IU"}],
                            "singer": "IU"
                        }, {
                            "id": 31,
                            "songName": "Love poem",
                            "albumId": 3,
                            "albumName": "Love poem",
                            "link": "11",
                            "singerList": [{"id": 6, "singerName": "IU"}],
                            "singer": "IU"
                        }, {
                            "id": 32,
                            "songName": "Love poem",
                            "albumId": 3,
                            "albumName": "Love poem",
                            "link": "11",
                            "singerList": [{"id": 6, "singerName": "IU"}],
                            "singer": "IU"
                        }, {
                            "id": 33,
                            "songName": "Love poem",
                            "albumId": 3,
                            "albumName": "Love poem",
                            "link": "11",
                            "singerList": [{"id": 6, "singerName": "IU"}],
                            "singer": "IU"
                        }]);

                        this.songList = res.data;
                    }
                });
            }
        },
        computed: {
            ...mapGetters(['recordDetail'])
        },
        watch: {
            scrollY(newY) {
                // 最大偏移链
                let translateY = Math.max(this.minTranslateY, newY);
                this.$refs.layer.style['transform'] = `translate3d(0, ${translateY}px, 0)`;
                this.$refs.layer.style['webkitTransform'] = `translate3d(0, ${translateY}px, 0)`;

                if (newY >= 0) {
                    this.$refs.bgImage.style.height = `${this.coverImgHeight + newY}px`;
                    this.$refs.list.$el.style.top = `${this.coverImgHeight + newY}px`;
                }
            }
        },
        components: {
            cover,
            songList,
            Scroll
        }
    }
</script>

<style scoped rel="stylesheet" lang="scss">
    @import "static/scss/variable.scss";

    .record-page {
        position: fixed;
        z-index: 50;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        background-color: $color-background;

        .song-wrap {
            position: absolute;
            width: 100%;
            top: 0;
            bottom: 0;
            background-color: $color-background;
            /*overflow: hidden;*/
        }

        .bg-layer {
            position: relative;
            height: 100%;
            background-color: $color-background;
        }
    }

    .player-enter-active, .player-leave-active {
        transition: all .3s;
    }

    .player-enter, .player-leave-to {
        transform: translateX(100%);
    }
</style>