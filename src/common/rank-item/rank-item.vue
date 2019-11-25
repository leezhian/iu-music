<template>
    <div class="rank-wrap">
        <div class="song-wrap">
            <ul>
                <li class="title">热歌榜</li>
                <!--                <li class="song-item" v-for="(item, index) in 3" :key="index"></li>-->
                <li class="song-item">
                    <span class="num">1.</span>
                    <span class="song-name">想念 - 易烊千玺</span>
                </li>
                <li class="song-item">
                    <span class="num">2.</span>
                    <span class="song-name">最高地位 - 艾辰</span>
                </li>
                <li class="song-item">
                    <span class="num">3.</span>
                    <span class="song-name">心引力 - 王俊凯/易烊千玺</span>
                </li>
            </ul>
        </div>
<!--        <div class="rank-img" :style="{'backgroud-image': `url(${aa})`}"></div>-->
        <div class="rank-img"
             :style="{'background-image': `url(https://y.gtimg.cn/music/photo_new/T002R90x90M000003qOjYQ2TlNFt.jpg?max_age=2592000)`}">
            <i class="icon-pause"></i>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            rank: {
                type: Object,
                default: {}
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet">
    @import "static/scss/variable.scss";
    @import "static/scss/mixin.scss";

    .rank-wrap {
        display: flex;
        height: 2rem;
        margin: .3rem .2rem 0;
        border-radius: .2rem;
        box-shadow: 0 0 10px $color-search-background;
        overflow: hidden;
        background-color: $color-background;
    }

    .song-wrap {
        flex-grow: 1;
        overflow: hidden;
        padding: .2rem;

        .title {
            font-weight: bold;
            font-size: $font-size-medium;
        }

        .song-item {
            @include no-wrap();

            .num {
            }

            .song-name {
                color: #666;
            }
        }
    }

    .rank-img {
        position: relative;
        flex-shrink: 0;
        width: 2rem;
        height: 100%;

        .icon-pause {
            position: absolute;
            bottom: .1rem;
            right: .1rem;
            font-family: iconfont;
            font-size: $font-size-medium;
            color: $color-text-white;
        }
    }
</style>