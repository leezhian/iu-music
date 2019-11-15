<template>
    <transition name="player">
        <div class="record-page">
            <cover :hasBack="true"
                   :type="album"
                   :coverImg="this.recordDetail.cover"
                   :recordName="this.recordDetail.albumName"
                   :recordSinger="this.recordDetail.singer"
                   :desc="this.recordDetail.description">
            </cover>

            <scroll class="song-wrap" :watchData="songList">
                <div>
                    <song-list :songList="songList" v-if="songList.length"></song-list>
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

    export default {
        created() {
            this._getSongList();
        },
        mounted() {
        },
        data() {
            return {
                songList: []
            }
        },
        methods: {
            _getSongList() {
                console.log(this.recordDetail);
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
                        res.data = res.data.concat([{"id":13,"songName":"Love poem","albumId":3,"albumName":"Love poem","link":"11","singerList":[{"id":6,"singerName":"IU"}],"singer":"IU"},{"id":14,"songName":"Love poem","albumId":3,"albumName":"Love poem","link":"11","singerList":[{"id":6,"singerName":"IU"}],"singer":"IU"},{"id":15,"songName":"Love poem","albumId":3,"albumName":"Love poem","link":"11","singerList":[{"id":6,"singerName":"IU"}],"singer":"IU"},{"id":16,"songName":"Love poem","albumId":3,"albumName":"Love poem","link":"11","singerList":[{"id":6,"singerName":"IU"}],"singer":"IU"},{"id":17,"songName":"Love poem","albumId":3,"albumName":"Love poem","link":"11","singerList":[{"id":6,"singerName":"IU"}],"singer":"IU"},{"id":18,"songName":"Love poem","albumId":3,"albumName":"Love poem","link":"11","singerList":[{"id":6,"singerName":"IU"}],"singer":"IU"},{"id":19,"songName":"Love poem","albumId":3,"albumName":"Love poem","link":"11","singerList":[{"id":6,"singerName":"IU"}],"singer":"IU"},{"id":20,"songName":"Love poem","albumId":3,"albumName":"Love poem","link":"11","singerList":[{"id":6,"singerName":"IU"}],"singer":"IU"},{"id":21,"songName":"Love poem","albumId":3,"albumName":"Love poem","link":"11","singerList":[{"id":6,"singerName":"IU"}],"singer":"IU"},{"id":22,"songName":"Love poem","albumId":3,"albumName":"Love poem","link":"11","singerList":[{"id":6,"singerName":"IU"}],"singer":"IU"},{"id":23,"songName":"Love poem","albumId":3,"albumName":"Love poem","link":"11","singerList":[{"id":6,"singerName":"IU"}],"singer":"IU"},{"id":24,"songName":"Love poem","albumId":3,"albumName":"Love poem","link":"11","singerList":[{"id":6,"singerName":"IU"}],"singer":"IU"}]);

                        this.songList = res.data;
                    }
                });
            }
        },
        computed: {
            ...mapGetters(['recordDetail'])
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
        height: 100%;
        background-color: $color-background;

        .song-wrap {
            position: absolute;
            width: 100%;
            top: 5.2rem;
            bottom: 0;
            background-color: $color-background;
            overflow: hidden;
        }
    }

    .player-enter-active, .player-leave-active {
        transition: all .3s;
    }

    .player-enter, .player-leave-to {
        transform: translateX(100%);
    }
</style>