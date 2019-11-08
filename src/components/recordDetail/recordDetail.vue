<template>
    <transition name="page">
        <div class="record-page">
            <cover :hasBack="true">
                <div class="cover-container">
                    <div class="title">专辑</div>
                    <div class="play-btn">
                        <i class="icon icon-smallPlay"></i>
                        <span class="btn-text">播放</span>
                    </div>
                </div>
            </cover>
        </div>
    </transition>
</template>

<script>
    import cover from 'common/cover/cover';

    export default {
        components: {
            cover
        }
    }
</script>

<style scoped rel="stylesheet" lang="scss">
    @import "static/scss/variable.scss";
    .record-page{
        position: fixed;
        z-index: 50;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: $color-background;
    }

    .page-enter-active, .page-leave-active {
        transition: all .3s;
    }

    .page-enter, .page-leave-to {
        transform: translateX(100%);
    }

</style>