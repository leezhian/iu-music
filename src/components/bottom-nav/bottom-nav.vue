<template>
    <div class="nav-container">
        <div class="nav">
            <router-link tag="div" to="/recommend" class="nav-item active">
                <i class="icon icon-music"></i>
                <p class="title">推荐</p>
            </router-link>
            <router-link tag="div" to="/album" class="nav-item">
                <i class="icon icon-album"></i>
                <p class="title">专辑</p>
            </router-link>
            <router-link tag="div" to="/rankinglist" class="nav-item">
                <i class="icon icon-rankingList"></i>
                <p class="title">排行</p>
            </router-link>
            <router-link tag="div" to="/user" class="nav-item">
                <i class="icon icon-user"></i>
                <p class="title">我的</p>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {}
</script>

<style scoped lang="scss" rel="stylesheet">
    @import "static/scss/variable.scss";

    .nav-container {
        width: 100%;
        height: 1.2rem;

        .nav {
            display: flex;
            align-items: center;
            width: 100%;
            height: 1.2rem;
            background-color: $color-nav-background;

            .nav-item {
                display: flex;
                flex-flow: column;
                align-items: center;
                justify-content: center;
                width: 25%;
                height: 100%;
                text-align: center;

                .icon {
                    font-size: $font-size-large;
                    font-family: iconfont;
                }

                .title {
                    text-align: center;
                }

                &.active {
                    color: $color-font-theme;
                }
            }
        }
    }
</style>