<template>
    <div class="song-list">
        <ul v-if="songList.length">
            <li :class="['song-item', {'active': item.id == currentSong.id}]"
                @click="selectItem(item,index)"
                v-for="(item, index) in songList"
                :key="item.id">
                <div class="cover" :style="{backgroundImage: `url(${item.cover})`}" v-if="showType == 'cover'">

                </div>
                <div class="rank" v-else-if="showType == 'num'">
                    <span class="num">{{index +1}}</span>
                </div>
                <div class="container">
                    <h2 class="name">{{item.songName}}</h2>
                    <p class="singer">{{item.singer | getDesc(item.albumName)}}</p>
                </div>
                <div class="tools" v-if="hasDownload">
                    <i class="download icon-download"></i>
                </div>
            </li>
        </ul>
        <p class="no-more" v-else>暂无歌曲</p>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        props: {
            songList: {
                type: Array,
                default: []
            },
            hasDownload: {
                type: Boolean,
                default: false
            },
            showType: {
                type: String,
                // num 显示数字 cover显示头像 none都不显示
                default: 'num'
            }
        },
        methods: {
            selectItem(item, index) {
                this.$emit('select', item, index);
            }
        },
        computed: {
            ...mapGetters([
                'currentSong'
            ])
        },
        filters: {
            'getDesc': (val, album) => {
                if (album && album.trim() == '') {
                    return val;
                }
                return `${val} · ${album}`;
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet">
    @import "static/scss/variable.scss";
    @import "static/scss/mixin.scss";

    .song-list {
        .no-more {
            margin: 1rem 0;
            text-align: center;
            font-size: $font-size-medium;
            color: $color-text-grey;
        }

        ul {
            display: block;
            width: 100%;
        }

        .song-item {
            display: flex;
            position: relative;
            margin-top: .2rem;
            width: 100%;
            align-items: center;
            overflow: hidden;

            &.active {
                &::before {
                    content: "";
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    width: .08rem;
                    height: 90%;
                    border-radius: .08rem;
                    background-color: $color-text-theme;
                }

                color: $color-text-theme !important;

                .rank {
                    color: $color-text-theme !important;
                }

                .container {
                    .singer {
                        color: $color-text-theme !important;
                    }
                }
            }

            .rank, .cover {
                flex-shrink: 0;
                width: 1.1rem;
                height: 1.1rem;
                line-height: 1.1rem;
                text-align: center;
                color: $color-grey-background;

                .num {
                    font-size: $font-size-medium;
                }
            }

            .cover {
                margin-right: .2rem;
                width: 1.1rem;
                border-radius: 4px;
                @include bg-coverAndCenter();
            }

            .container {
                flex-grow: 1;
                overflow: hidden;
                padding-right: .1rem;

                .name {
                    font-weight: normal;
                    font-size: $font-size-medium-s;
                    @include no-wrap();
                }

                .singer {
                    font-weight: lighter;
                    font-size: $font-size-small;
                    color: $color-grey-background;
                    @include no-wrap();
                }
            }

            .tools {
                flex-shrink: 0;
                width: 1rem;
                height: 1rem;
                line-height: 1.1rem;
                text-align: center;

                .download {
                    font-family: iconfont;
                    font-size: $font-size-medium;
                    color: $color-grey-background;
                }
            }
        }
    }
</style>