<template>
    <!--用于指定区域滚动的组件-->
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from '@better-scroll/core';
    import Pullup from '@better-scroll/pull-up';

    BScroll.use(Pullup);

    export default {
        props: {
            probeType: {
                type: Number,
                default: 1
            },
            refreshDelay: {
                type: Number,
                default: 20
            },
            click: { // 手动派发点击事件
                type: Boolean,
                default: true
            },
            listenScroll: { // 要不要监听滚动事件
                type: Boolean,
                default: false
            },
            watchData: {
                type: Array,
                default: null
            },
            isPullUpLoad: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            // 确保dom生成完成，定时器作用是因为浏览器的刷新大概在17毫秒左右
            setTimeout(() => {
                this._initScroll()
            }, 20)
        },
        methods: {
            _initScroll() {
                if (!this.$refs.wrapper) {
                    return;
                }

                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click,
                    pullUpLoad: this.isPullUpLoad, // 是否开启上拉加载更多
                });

                if (this.isPullUpLoad) {
                    this.scroll.on('pullingUp', this.pullingUpHandler)
                }
            },
            /**
             * 代理better-scroll的方法
             * 启用 better-scroll, 默认 开启。
             */
            enable() {
                this.scroll && this.scroll.enable()
            },
            /**
             * 启用 better-scroll, 默认 开启。
             */
            disable() {
                this.scroll && this.scroll.disable()
            },
            /**
             * 重新计算 better-scroll，
             * 当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
             */
            refresh() {
                this.scroll && this.scroll.refresh();
            },
            finishPullUp() {
                this.scroll && this.scroll.finishPullUp();
            },
            pullingUpHandler() {
                // this.finishPullUp();
                // this.refresh();
            }
        },
        watch: {
            // 当数据改变的时候，scroll需要刷新重新计算
            watchData() {
                setTimeout(() => {
                    this.refresh()
                }, this.refreshDelay)
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet">

</style>