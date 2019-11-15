<template>
    <div class="song-list">
        <ul>
            <li :class="['song-item', {'active': index==0}]"
                v-for="(item, index) in songList"
                :key="item.id">
                <div class="rank">
                    <span class="num" v-if="showNum">{{index +1}}</span>
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
    </div>
</template>

<script>
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
            showNum: {
                type: Boolean,
                default: true
            }
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
        ul {
            display: block;
            width: 100%;
        }

        .song-item {
            display: flex;
            position: relative;
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
                    background-color: $color-font-theme;
                }

                color: $color-font-theme !important;

                .rank {
                    color: $color-font-theme !important;
                }

                .container {
                    .singer {
                        color: $color-font-theme !important;
                    }
                }
            }

            .rank {
                flex-shrink: 0;
                width: 1rem;
                height: 1.2rem;
                line-height: 1.2rem;
                text-align: center;
                color: $color-grey-background;

                .num {
                    font-size: $font-size-medium;
                }
            }

            .container {
                flex-grow: 1;
                overflow: hidden;
                padding-right: .1rem;

                .name {
                    font-weight: normal;
                    font-size: $font-size-medium;
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
                line-height: 1.2rem;
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