<template>
    <div class="recommend-page">
        <scroll class="recommend-content" :watch-data="songList" :bounce-top="false" :bounce-bottom="false">
            <div>
                <div class="search-wrap">
                    <input class="search" type="search" placeholder="搜索">
                    <div class="logo"></div>
                </div>

                <div class="swiper-wrap">
                    <slider v-if="swiperList.length">
                        <div v-for="item in swiperList" :key="item.id">
                            <a :href="item.link">
                                <img :src="item.poster" alt="">
                            </a>
                        </div>
                    </slider>
                </div>

                <div class="playList-container">
                    <div class="playList-header">
                        <p class="title">推荐歌单</p>
                        <router-link to="/recommend/playlist" class="btn" tag="div">歌单广场</router-link>
                    </div>
                    <ul class="cover-item-box" v-if="playList.length">
                        <li class="cover-item"
                            v-for="(item, index) in playList"
                            :key="item.id"
                            @click="handleClickRecord(index)"
                            ref="coverItem">
                            <div class="cover-img"
                                 v-lazy:background-image="item.cover"
                                 :style="{'height': coverImgH + 'px'}">
                                <div class="cover-label">
                                    <i class="icon icon-smallPlay"></i>
                                    <span class="num">{{item.total}}</span>
                                </div>
                            </div>
                            <p class="cover-content">{{item.recordName}}</p>
                        </li>
                    </ul>

                    <div class="playList-header">
                        <p class="title">推荐单曲</p>
                    </div>

                    <song-list @select="selectItem" :songList="songList" v-if="songList.length"></song-list>
                </div>
            </div>
        </scroll>

        <router-view></router-view>
    </div>
</template>

<script>
    // 固定区域滚动
    import Scroll from 'common/scroll/scroll';
    import slider from 'common/slider/slider';
    import SongList from 'common/song-list/song-list';
    import {mapActions, mapMutations} from 'vuex';

    import {getSwiperList, getRecommendPlayerList, getRecommendSongs} from 'api/recommend';
    import _ from 'lodash';

    import {SET_RECORD_DETAIL} from 'store/mutation-types';

    export default {
        created() {
            // 获取轮播图
            this._getSwiperList();
            // 推荐歌单
            this._getRecommendPlayerList();
            // 推荐单曲
            this._getRecommendSongs();
        },
        mounted() {
            const self = this;
            window.addEventListener('resize', self._resetCoverH);
        },
        beforeDestroy() {
            const self = this;
            window.removeEventListener('resize', self._resetCoverH);
        },
        data() {
            return {
                coverImgH: 1, // 歌单海报高度
                swiperList: [], // 轮播图
                playList: [], // 推荐歌单
                songList: [], // 推荐单曲
            }
        },
        methods: {
            // 点击推荐歌单
            handleClickRecord(index) {
                const recordId = this.playList[index].id;
                this.$router.push({
                    path: `/recommend/playlist/${recordId}`,
                    query: {
                        recordtype: 2
                    }
                });
                // 修改store的数据
                this.setRecordDetail(this.playList[index]);
            },
            // 点击单曲
            selectItem(item, index) {
                this.selectPlay({
                    list: this.songList,
                    index
                })
            },
            // 重置推荐歌单图片高度
            _resetCoverH() {
                if (!this.$refs.coverItem) {
                    return;
                }
                this.coverImgH = this.$refs.coverItem[0].clientWidth;
            },
            /**
             * 轮播图
             */
            _getSwiperList() {
                getSwiperList().then(res => {
                    if (res.code == 200) {
                        _.forEach(res.data, item => {
                            if (item.linkType == 1) {
                                item.link = `/playlist/${item.id}`;
                            } else if (item.linkType == 2) {
                                item.link = `/ablum/${item.id}`;
                            }
                        });
                        this.swiperList = res.data;
                    }
                });
            },
            /**
             * 推荐歌单
             */
            _getRecommendPlayerList() {
                getRecommendPlayerList().then(res => {
                    if (res.code == 200) {
                        this.playList = res.data;
                    }
                });
            },
            /**
             * 推荐单曲
             */
            _getRecommendSongs() {
                getRecommendSongs().then(res => {
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
                        this.songList = res.data;
                    }
                });
            },
            ...mapMutations({
                setRecordDetail: SET_RECORD_DETAIL
            }),
            ...mapActions([
                'selectPlay'
            ])
        },
        components: {
            slider,
            SongList,
            Scroll
        },
        watch: {
            'playList': function () {
                setTimeout(() => {
                    if (this.playList.length) {
                        this._resetCoverH();
                    }
                }, 20)
            }
        }
    }
</script>

<style scoped rel="stylesheet" lang="scss">
    @import "static/scss/variable.scss";
    @import "static/scss/mixin.scss";

    .recommend-page {
        /*position: fixed;*/
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 1.2rem;
        /*overflow: hidden;*/

        .recommend-content {
            height: 100%;
            overflow: hidden;
        }
    }

    .search-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 1rem;
        padding-left: .3rem;
        padding-right: .3rem;

        .search {
            flex-grow: 1;
            display: block;
            padding-left: .2rem;
            padding-right: .2rem;
            height: .6rem;
            border-radius: 3rem;
            border: none;
            outline: none;
            background-color: $color-search-background;
        }

        .logo {
            margin-left: .3rem;
            flex-shrink: 0;
            width: 1rem;
            height: 1rem;
            padding: .1rem;
            background-origin: content-box;
            background-clip: content-box;
            @include bg-cover('../../static/images/logo.png');
        }

        input::-webkit-input-placeholder {
            color: $color-text-grey;
        }
    }

    .swiper-wrap {
        position: relative;
        width: 92%;
        /*width: 6.9rem;*/
        margin: 0 auto .3rem;
        overflow: hidden;
        border-radius: .16rem;
    }

    .playList-container {
        position: relative;
        padding: .3rem;
        width: 100%;
        border-top: 1px solid $color-nav-background;

        .playList-header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .title {
                font-size: $font-size-medium;
                font-weight: bold;
            }

            .btn {
                height: .5rem;
                padding-left: .2rem;
                padding-right: .2rem;
                border: 1px solid $color-text-grey;
                border-radius: .25rem;
                line-height: .5rem;
            }
        }

        .cover-item-box {
            display: flex;
            justify-content: space-between;
            flex-flow: wrap;
            padding-top: .3rem;
            overflow: hidden;

            .cover-item {
                display: block;
                margin-bottom: .2rem;
                width: 30%;

                .cover-img {
                    display: block;
                    width: 100%;
                    border-radius: .1rem;
                    @include bg-coverAndCenter()
                }

                .cover-content {
                    /*display: -webkit-box;*/
                    overflow: hidden;
                    margin-top: .1rem;
                    width: 100%;
                    @include nth-lines(2);
                    /*text-overflow: ellipsis;*/
                    /*-webkit-line-clamp: 2;*/
                    /*-webkit-box-orient: vertical;*/
                }

                .cover-label {
                    padding: .1rem;
                    text-align: right;
                    color: $color-text-white;

                    .icon {
                        font-family: iconfont;
                    }

                    .num {
                    }
                }
            }
        }
    }
</style>