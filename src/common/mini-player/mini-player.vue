<template>
    <div class="mini-wrap" @click="handlePlayer">
        <div class="mini-player play" >
            <img class="mini-cover" :src="`https://y.gtimg.cn/music/photo_new/T002R90x90M000003HmTZY2CV5yp.jpg?max_age=2592000)`" alt="">
        </div>

        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        methods: {
            // 点击mini播放器
            handlePlayer() {
                this.$emit('changePlayer', true);
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet">
    @import "static/scss/variable.scss";
    @import "static/scss/mixin.scss";

    .mini-wrap {
        z-index: 50;
        position: fixed;
        right: .3rem;
        bottom: 2rem;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: $color-background;
    }

    .mini-player {
        width: 100%;
        height: 100%;
        border: .04rem solid rgba(147, 112, 219, .5);
        border-radius: 50%;

        .mini-cover {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            @include bg-coverAndCenter();
        }

        &.play {
            animation: playerRotate 10s linear infinite;
        }
    }

    @keyframes playerRotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>