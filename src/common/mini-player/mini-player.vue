<template>
    <div class="mini-wrap">
        <div class="mini-player play" @click="handlePlayer">
            <img class="mini-cover" :src="`https://y.gtimg.cn/music/photo_new/T002R90x90M000003HmTZY2CV5yp.jpg?max_age=2592000)`" alt="">
        </div>

        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        methods: {
            handlePlayer() {
                this.$router.push({
                    path: `/player`
                });
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet">
    @import "static/scss/variable.scss";
    @import "static/scss/mixin.scss";

    .mini-wrap {
        position: fixed;
        right: .3rem;
        bottom: 2rem;
        width: 1rem;
        height: 1rem;
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