<template>
    <div class="album-page">
        <cover>
            <div class="cover-container">
                <div class="title">专辑</div>
                <div class="play-btn">
                    <i class="icon icon-smallPlay"></i>
                    <span class="btn-text">播放</span>
                </div>
            </div>
        </cover>

        <record></record>

        <router-view></router-view>
    </div>
</template>

<script>
    import cover from 'common/cover/cover';
    import record from 'common/record/record';

    export default {
        data() {
            return {}
        },
        components: {
            cover,
            record
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet">
    .album-page{
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 1.2rem;
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>