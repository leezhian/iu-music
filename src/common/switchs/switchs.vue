<template>
    <ul class="switches">
        <li class="switch-item"
            v-for="(item,index) in switches"
            :class="{'active':currentIndex === index}"
            @click="switchItem(index)"
            :key="index">
            <span>{{item.name}} </span>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            switches: {
                type: Array,
                default: []
            },
            currentIndex: {
                type: Number,
                default: 0
            }
        },
        methods: {
            switchItem(index) {

            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet">
    @import "static/scss/variable.scss";

    .switches {
        display: flex;
        align-items: center;
        width: 4.8rem;
        margin: 0 auto;
        border: 1px solid $color-text-theme;
        border-radius: .1rem;

        .switch-item {
            flex: 1;
            padding: .08rem;
            text-align: center;
            font-size: $font-size-medium;
            color: $color-text-theme;

            &.active {
                background: $color-text-theme;
                color: $color-text-white
            }
        }
    }
</style>