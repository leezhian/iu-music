<template>
    <div id="app">
        <bottom-nav></bottom-nav>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
<!--        <Player></Player>-->
    </div>
</template>

<script>
    import BottomNav from 'components/bottom-nav/bottom-nav';
    import Player from 'components/player/player';

    export default {
        components: {
            BottomNav,
            Player
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet">
</style>