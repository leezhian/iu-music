<template>
    <div class="error-page">
        <h3 class="title">404~</h3>
        <div class="error-wrapper">
            <div class="error-img"></div>
            <div class="error-text">页面走丢了...</div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped lang="scss" rel="stylesheet">
    @import "static/scss/variable.scss";
    @import "static/scss/mixin.scss";

    .error-page {
        display: flex;
        flex-flow: column;
        justify-content: center;
        flex-wrap: wrap;
        position: absolute;
        z-index: 10;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 1.2rem;
        overflow: hidden;

        .title {
            padding: 0 .3rem;
            font-size: 1.6rem;
            font-weight: bold;
            text-align: right;
            color: $color-text-theme;
        }

        .error-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .error-img {
            width: 3rem;
            height: 3rem;
            @include bg-cover('../../static/images/error.png')
        }

        .error-text {
            font-size: $font-size-large-x;
            font-weight: bold;
            color: $color-text-theme;
        }
    }
</style>