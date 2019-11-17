<template>
    <transition name="playlist">
        <div :class="['album-page', 'playlist-page']">
            <scroll class="album-content"
                    :watch-data="recordList"
                    :bounce-top="false"
                    @pullUpMore="pullUpMore"
                    :is-pull-up="true">
                <div>
                    <cover :cover-img="coverImg" :has-back="true">
                        <div class="container cover-container" :style="{'background-image': `url(${coverImg})`}">
                            <div class="title">歌单广场</div>
                            <div class="play-btn">
                                <i class="icon icon-smallPlay"></i>
                                <span class="btn-text">播放</span>
                            </div>
                        </div>
                    </cover>

                    <record :record-list="recordList" @handleClickRecord="handleClickRecord"
                            v-if="recordList.length"></record>

                </div>
            </scroll>
            <router-view></router-view>
        </div>
    </transition>
</template>

<script>
    import Scroll from 'common/scroll/scroll';
    import cover from 'common/cover/cover';
    import record from 'common/record/record';

    import {mapMutations} from 'vuex';
    import {SET_RECORD_DETAIL} from 'store/mutation-types';

    import {getRecordList, getCover} from 'api/album';

    export default {
        created() {
            this._getCover(this.coverType);
            this._getPlayList(this.coverType, this.page, this.pageSize);
        },
        data() {
            return {
                coverType: 2, // 封面图的类型 1 album  2 playlist
                coverImg: '',
                page: 1,
                pageSize: 6,
                hasNextPage: true, // 是否有下一页
                recordList: [], // 唱片列表
            }
        },
        methods: {
            async pullUpMore(finish) {
                if (!this.hasNextPage) {
                    finish();
                    return;
                }
                await this._getPlayList(this.coverType, this.page, this.pageSize);
                finish();
            },
            async _getPlayList(type, page, pageSize) {
                const res = await getRecordList(type, page, pageSize);
                if (res.code == 200) {
                    // 处理singer
                    this.page += 1;
                    this.recordList = this.recordList.concat(res.data.list);
                    this.hasNextPage = res.data.hasNextPage;
                }
            },
            handleClickRecord(index) {
                const recordId = this.recordList[index].id;
                this.$router.push({
                    path: `/recommend/playlist/${recordId}`,
                    query: {
                        recordtype: this.coverType
                    }
                });
                // 修改store的数据
                this.setRecordDetail(this.recordList[index]);
            },
            _getCover(type) {
                getCover(type).then(res => {
                    if (res.code == 200) {
                        this.coverImg = res.data.cover;
                    }
                });
            },
            ...mapMutations({
                setRecordDetail: SET_RECORD_DETAIL
            })
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

    .pullup-wrapper {
        width: 100%;
        height: .8rem;
        line-height: .8rem;
        font-size: $font-size-medium;
        text-align: center;
        color: $color-grey-background;
        background-color: $color-search-background;
    }

    .playlist-enter-active, .playlist-leave-active {
        transition: all .3s;
    }

    .playlist-enter, .playlist-leave-to {
        transform: translateX(100%);
    }
</style>