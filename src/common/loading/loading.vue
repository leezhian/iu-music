<template>
    <div class="loading">
        <img :src="loadImg" alt="" width="24" height="24">
        <p class="desc">{{title}}</p>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: '正在载入...'
            }
        },
        data() {
            return {
                loadImg: require('static/images/loading.gif')
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet">
    @import "static/scss/variable.scss";

    .loading {
        width: 100%;
        text-align: center;

        .desc {
            line-height: 20px;
            font-size: $font-size-small;
            color: $color-grey-background;
        }
    }
</style>
