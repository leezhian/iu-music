<template>
    <div id="app">
        <bottom-nav></bottom-nav>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
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
</style>