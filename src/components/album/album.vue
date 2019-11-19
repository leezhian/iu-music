<template>
    <div :class="['album-page']">
        <scroll class="album-content"
                :watch-data="recordList"
                :bounce-top="false"
                @pullUpMore="pullUpMore"
                :is-pull-up="true">
            <div>
                <cover :cover-img="coverImg">
                    <div class="container cover-container" :style="{'background-image': `url(${coverImg})`}">
                        <div class="title">专辑</div>
                        <div class="play-btn">
                            <i class="icon icon-smallPlay"></i>
                            <span class="btn-text" @click="randomRecord" v-show="recordList.length">播放</span>
                        </div>
                    </div>
                </cover>

                <record :record-list="recordList"
                        @handleClickRecord="handleClickRecord"
                        v-if="recordList.length"></record>
            </div>
        </scroll>
        <router-view></router-view>
    </div>
</template>

<script>
    import Scroll from 'common/scroll/scroll';
    import cover from 'common/cover/cover';
    import record from 'common/record/record';
    import _ from 'lodash';
    import {randomIndex} from 'static/js/utils';

    import {mapMutations, mapActions} from 'vuex';
    import {SET_RECORD_DETAIL} from 'store/mutation-types';

    import {getRecordList, getCover, getSongList} from 'api/album';

    export default {
        created() {
            // 因为歌单广场和专辑公用页面，所以使用this.$route.name来判断类别
            this._getCover(this.coverType);
            this._getAlbumList(this.coverType, this.page, this.pageSize);
        },
        data() {
            return {
                coverType: 1, // 封面图的类型 1 album  2 playlist
                coverImg: '',
                page: 1,
                pageSize: 2,
                hasNextPage: true, // 是否有下一页
                recordList: [], // 唱片列表
                songList: [], // 点击播放的时候用来保存歌曲
            }
        },
        methods: {
            // 点击播放
            async randomRecord() {
                const index = randomIndex(0, this.recordList.length - 1);
                const select = this.recordList[index];
                await this._getSongList(select.songIds);
                // 如果获取的歌单没有歌曲，则重新获取
                if (!this.songList.length) {
                    this.randomRecord();
                    return
                }
                this.selectPlay({
                    list: this.songList,
                    index: 0
                })
            },
            // 加载更多回调
            async pullUpMore(finish) {
                if (!this.hasNextPage) {
                    finish();
                    return;
                }
                await this._getAlbumList(this.coverType, this.page, this.pageSize);
                finish();
            },
            // 点击专辑
            handleClickRecord(index) {
                const recordId = this.recordList[index].id;
                this.$router.push({
                    path: `/album/${recordId}`,
                    query: {
                        recordtype: this.coverType
                    }
                });
                // 修改store的数据
                this.setRecordDetail(this.recordList[index]);
            },
            // 获取专辑列表
            async _getAlbumList(type, page, pageSize) {
                const res = await getRecordList(type, page, pageSize);
                if (res.code == 200) {
                    // 处理singer
                    _.forEach(res.data.list, item => {
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

                    this.page += 1;
                    this.recordList = this.recordList.concat(res.data.list);
                    this.hasNextPage = res.data.hasNextPage;
                }
                return;
            },
            // 获取专辑列表封面
            _getCover(type) {
                getCover(type).then(res => {
                    if (res.code == 200) {
                        this.coverImg = res.data.cover;
                    }
                });
            },
            /**
             * 获取歌曲列表
             */
            async _getSongList(songIds) {
                // 获取歌曲列表
                const res = await getSongList(songIds);
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
            },
            ...mapMutations({
                setRecordDetail: SET_RECORD_DETAIL
            }),
            ...mapActions([
                'selectPlay'
            ])
        },
        components: {
            cover,
            record,
            Scroll
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet">
    @import "static/scss/variable.scss";

    .album-page {
        /*position: fixed;*/
        position: absolute;
        z-index: 10;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 1.2rem;
        overflow: hidden;

        &.playlist-page {
            position: fixed;
            z-index: 50;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            width: 100%;
            background-color: $color-background;
        }

        .album-content {
            height: 100%;
            overflow: hidden;
        }
    }

    .playlist-enter-active, .playlist-leave-active {
        transition: all .3s;
    }

    .playlist-enter, .playlist-leave-to {
        transform: translateX(100%);
    }
</style>