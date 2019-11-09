<template>
    <!--    <div class="mini-player" :style="{'background-image': `url(${https://y.gtimg.cn/music/photo_new/T002R90x90M000003HmTZY2CV5yp.jpg?max_age=2592000})`}">-->
    <div class="mini-player play"
         :style="{'background-image': `url(https://y.gtimg.cn/music/photo_new/T002R90x90M000003HmTZY2CV5yp.jpg?max_age=2592000)`}">

    </div>
</template>

<script>
    export default {
        name: "mini-player"
    }
</script>

<style scoped lang="scss" rel="stylesheet">
    @import "static/scss/variable.scss";
    @import "static/scss/mixin.scss";

    .mini-player {
        position: fixed;
        right: .3rem;
        bottom: 2rem;
        width: 1rem;
        height: 1rem;
        border: .04rem solid rgba(147, 112, 219, .5);
        border-radius: 50%;
        transform: rotate(0deg);
        @include bg-coverAndCenter();

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