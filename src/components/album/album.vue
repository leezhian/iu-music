<template>
    <div class="album-page">
        <scroll class="album-content" :watchData="recordList">
            <div>
                <cover :coverImg="coverImg">
                    <div class="cover-container">
                        <div class="title">专辑</div>
                        <div class="play-btn">
                            <i class="icon icon-smallPlay"></i>
                            <span class="btn-text">播放</span>
                        </div>
                    </div>
                </cover>

                <record :recordList="recordList" @handleClickRecord="handleClickRecord"
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

    import {mapMutations} from 'vuex';
    import {SET_RECORD_DETAIL} from 'store/mutation-types';

    import {getAlbumList, getCover} from 'api/album';

    export default {
        created() {
            this._getCover(1);
            this._getAlbumList(this.page, this.pageSize);
        },
        data() {
            return {
                coverImg: '',
                page: 1,
                pageSize: 6,
                hasNextPage: true, // 是否有下一页
                recordList: [], // 唱片列表
            }
        },
        methods: {
            _getAlbumList(page, pageSize) {
                getAlbumList(page, pageSize).then(res => {
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
                });
            },
            _getCover(type) {
                getCover(type).then(res => {
                    if (res.code == 200) {
                        this.coverImg = res.data.cover;
                    }
                });
            },
            handleClickRecord(index) {
                const recordId = this.recordList[index].id;
                this.$router.push({
                    path: `/album/${recordId}`
                });
                // 修改store的数据
                this.setRecordDetail(this.recordList[index]);
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

        .album-content {
            height: 100%;
            overflow: hidden;
        }
    }
</style>