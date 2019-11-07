<template>
    <div class="cover-wrap" :style="{'background-image': `url(${coverImg})`}">
        <div class="top">
            <i class="goToBack icon-back" v-if="hasBack"></i>
        </div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            coverImg: {
                type: String,
                default: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573155109011&di=166f970dce66954e35ce0bc158043cf8&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F16ad335896ad55cc03d0ed4a84ae96b7c0aaa52215c13-N681eW_fw658'
            },
            hasBack: {
                type: Boolean,
                // default: true
                default: false
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
        height: 4.2rem;
        overflow: hidden;
        @include bg-coverAndCenter();
    }

    .top {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: .8rem;
        z-index: 100;

        .goToBack {
            display: block;
            width: .8rem;
            height: .8rem;
            font-size: $font-size-medium;
            font-family: iconfont;
            text-align: center;
            line-height: .8rem;
            color: $color-icon-default;
        }
    }

    .cover-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;

        .title {
            font-size: .6rem;
            font-weight: bold;
            text-align: center;
            color: $color-text-w;
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
            color: $color-text-w;
            background-color: rgba(147, 112, 219, .8);

            .icon {
                font-family: iconfont;
            }

            .btn-text {
                margin-left: .1rem;
            }
        }
    }
</style>