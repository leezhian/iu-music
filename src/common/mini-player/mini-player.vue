<template>
    <div class="mini-wrap" @click="handlePlayer">
        <div class="mini-player play" >
            <img class="mini-cover" src="../../static/images/player.png" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            // 点击mini播放器
            handlePlayer() {
                this.$emit('changePlayer', true);
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet">
    @import "static/scss/variable.scss";
    @import "static/scss/mixin.scss";


</style>