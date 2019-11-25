<template>
    <div class="rankList-page">
        <rank-item></rank-item>
        <rank-item></rank-item>
        <rank-item></rank-item>

        <router-view></router-view>
    </div>
</template>

<script>
    import rankItem from 'common/rank-item/rank-item';

    export default {
        components: {
            rankItem
        }
    }
</script>

<style scoped rel="stylesheet" lang="scss">
    @import "static/scss/variable.scss";
    @import "static/scss/mixin.scss";

    .rankList-page {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 1.2rem;
    }
</style>