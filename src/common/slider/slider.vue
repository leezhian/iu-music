<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
<!--        <div class="dots">-->
<!--            <span class="dot" -->
<!--                  :class="{'active': currentPageIndex === index}" -->
<!--                  v-for="(item, index) in dots"-->
<!--                  :key="index"></span>-->
<!--        </div>-->
    </div>
</template>

<script>
    export default {}
</script>

<style scoped lang="scss" rel="stylesheet">

</style>