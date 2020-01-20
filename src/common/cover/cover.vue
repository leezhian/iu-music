<template>
    <div class="cover-wrap">
        <div class="top" :style="{'background-image': `url(${coverImg})`}" v-if="hasBack">
            <i class="icon icon-back" @click="goToBackHandle"></i>
            <i class="icon icon-like like"></i>
        </div>
        <slot>
            <!--            <div class="container">-->
            <!--                <div class="info">-->
            <!--                    <h3 class="record-name">{{this.recordName}}</h3>-->
            <!--                    <p class="record-singer" v-if="type == 'album'">—— {{this.recordSinger}}</p>-->
            <!--                </div>-->
            <!--                <div class="tools">-->
            <!--                    <div class="btn"><i class="icon-pause"></i></div>-->
            <!--                    <div class="btn"><i class="icon icon-cart"></i></div>-->
            <!--                </div>-->
            <!--                <p class="desc" v-if="type == 'album'">简介: {{this.desc}}</p>-->
            <!--            </div>-->
        </slot>
    </div>
</template>

<script>
    export default {
        props: {
            coverImg: {
                type: String,
                default: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000003bSL0v4bpKAx_1.jpg?max_age=2592000'
            },
            hasBack: {
                type: Boolean,
                default: false
            },
        },
        methods: {
            goToBackHandle() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet">
    @import "static/scss/variable.scss";
    @import "static/scss/mixin.scss";

    .cover-wrap {
        position: relative;
        width: 100%;
        /*height: 5.2rem;*/
        overflow: hidden;
    }

    .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: .8rem;
        z-index: 50;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: top;

        .icon {
            display: block;
            width: .8rem;
            height: .8rem;
            font-size: $font-size-medium;
            font-family: iconfont;
            text-align: center;
            line-height: .8rem;
            color: $color-icon-default;

            &.icon-like.like {
                color: $color-text-theme;
            }
        }
    }

    /*改为other-container*/
    .cover-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    // 详情样式
    .container {
        position: relative;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        width: 100%;
        height: 5.2rem;
        /*height: 100%;*/
        padding: .8rem .3rem .3rem;
        overflow: hidden;
        color: $color-text-white;

        @include bg-coverAndCenter();
        background-position: top;

        // 歌单广场和专辑封面样式
        &.cover-container {
            align-items: center;
            justify-content: center;

            .title {
                font-size: .6rem;
                font-weight: bold;
                text-align: center;
                color: $color-text-white;
            }

            .play-btn {
                position: absolute;
                left: 50%;
                bottom: .4rem;
                transform: translateX(-50%);
                width: 2rem;
                height: .6rem;
                border-radius: .3rem;
                font-size: $font-size-medium;
                text-align: center;
                line-height: .6rem;
                color: $color-text-white;
                background-color: rgba(147, 112, 219, .8);

                .icon {
                    font-family: iconfont;
                }

                .btn-text {
                    margin-left: .1rem;
                }
            }
        }

        .info {
            flex-grow: 1;

            .record-name {
                font-size: .6rem;
                font-weight: bold;
                @include no-wrap();
            }

            .record-singer {
                padding-left: .3rem;
                font-size: $font-size-medium;
            }
        }

        .tools {
            flex-shrink: 0;
            position: absolute;
            bottom: .3rem;
            right: .2rem;

            .btn {
                margin-top: .1rem;
                font-size: $font-size-large-3x;

                i {
                    font-family: iconfont;
                }
            }
        }

        .desc {
            overflow: hidden;
            padding-right: .5rem;
            font-size: $font-size-medium;
            word-break: break-all;
            @include nth-lines(2);
        }
    }
</style>