<template>
    <div id="app">
        <bottom-nav></bottom-nav>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <mini-player></mini-player>
    </div>
</template>

<script>
    import BottomNav from 'components/bottom-nav/bottom-nav';
    import MiniPlayer from 'common/mini-player/mini-player';

    export default {
        components: {
            MiniPlayer,
            BottomNav
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet">
</style>