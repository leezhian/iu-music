<template>
    <div id="app">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <bottom-nav class="nav-fixed"></bottom-nav>
    </div>
</template>

<script>
    import bottomNav from 'components/bottom-nav/bottom-nav';

    export default {
        components: {
            bottomNav
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet">
    .nav-fixed {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>