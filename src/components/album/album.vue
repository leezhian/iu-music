<template>
    <div class="album-page">
        <cover>
            <div class="cover-container">
                <div class="title">专辑</div>
                <div class="play-btn">
                    <i class="icon icon-smallPlay"></i>
                    <span class="btn-text">播放</span>
                </div>
            </div>
        </cover>

        <record :recordList="recordList" @handleClickRecord="handleClickRecord" v-if="recordList.length"></record>

        <router-view></router-view>
    </div>
</template>

<script>
    import cover from 'common/cover/cover';
    import record from 'common/record/record';
    import _ from 'lodash';

    import {getAblumList} from 'api/ablum';

    export default {
        created() {
            getAblumList(this.page, this.pageSize).then(res => {
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
        data() {
            return {
                page: 1,
                pageSize: 6,
                hasNextPage: true, // 是否有下一页
                recordList: [], // 唱片列表
            }
        },
        methods: {
            handleClickRecord(index) {
                // const self = this;
                const recordId = this.recordList[index].id;
                this.$router.push({
                    path: `/album/${recordId}`,
                    params: {
                        songIds: this.recordList[index].songIds
                    }
                });
            }
        },
        components: {
            cover,
            record
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet">
    .album-page {
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 1.2rem;
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>