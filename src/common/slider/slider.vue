<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <span class="dot"
                  :class="{'active': currentPageIndex === index}"
                  v-for="(item, index) in dots"
                  :key="index"></span>
        </div>
    </div>
</template>

<script>
    import BScroll from '@better-scroll/core';
    import Slide from '@better-scroll/slide';
    import {addClass} from "static/js/dom";

    BScroll.use(Slide);

    export default {
        props: {
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 4000
            }
        },
        data() {
            return {
                dots: [],
                currentPageIndex: 0
            }
        },
        mounted() {
            setTimeout(() => {
                this._setSliderWidth();
                this._initSlider();
            }, 20);

            // 当浏览器尺寸变化的时候重新计算
            window.addEventListener('resize', () => {
                if (!this.slider) {
                    return;
                }
                this._setSliderWidth(true);
                this.slider.refresh();
            });
        },
        beforeDestroy() {
            clearTimeout(this.timer);
            this.slider.destroy();
        },
        methods: {
            /**
             * 设置轮播图宽度
             * @param isResize 当前页面宽度是否改变
             */
            _setSliderWidth(isResize) {
                // 获取轮播图dom
                this.children = this.$refs.sliderGroup.children;
                // 设置默认轮播图宽度
                let width = 0;
                // 获取一张图片slider的宽度大小
                let sliderWidth = this.$refs.slider.clientWidth;
                for (let i = 0; i < this.children.length; i++) {
                    // 为每张轮播图添加一个样式类，并计算轮播图的总长
                    let child = this.children[i];
                    addClass(child, 'slider-item');
                    child.style.width = sliderWidth + 'px';
                    width += sliderWidth;
                }

                // 如果是循环轮播的话，需要长度加多两个图片的长度
                if (this.loop && !isResize) {
                    width += 2 * sliderWidth
                }
                this.$refs.sliderGroup.style.width = width + 'px';
            },
            /**
             * 初始化点
             */
            _initDots() {
                // 算出点的个数
                const len = this.children.length >= 3 ? this.children.length - 2 : this.children.length;
                this.dots = new Array(len);
            },
            // 初始化轮播图
            _initSlider() {
                this.slider = new BScroll(this.$refs.slider, {
                    scrollX: true, // 允许x轴滚动
                    scrollY: false, // 禁止y轴滚动
                    momentum: false, // 不开启动画
                    bounce: false,
                    slide: {
                        loop: this.loop,
                        threshold: 100 // 滚动阈值
                    },
                    probeType: 2,
                    stopPropagation: true // 阻止冒泡
                });

                this._initDots();

                // 判断是否自动播放
                if (this.autoPlay) {
                    this._play()
                }

                this.slider.on('slideWillChange', (page) => {
                    this.currentPageIndex = page.pageX
                });

                this.slider.on('scrollEnd', () => {
                    if (this.autoPlay) {
                        clearTimeout(this.timer);
                        this._play();
                    }
                })
            },
            // 自动轮播
            _play() {
                this.timer = setTimeout(() => {
                    this.slider.next();
                }, this.interval);
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet">
    @import "static/scss/variable.scss";

    .slider {
        .slider-group {
            position: relative;
            overflow: hidden;
            white-space: nowrap;

            .slider-item {
                float: left;
                box-sizing: border-box;
                border-radius: .16rem;
                overflow: hidden;
                text-align: center;

                a {
                    display: block;
                    width: 100%;
                    overflow: hidden;
                    text-decoration: none;
                }

                img {
                    display: block;
                    width: 100%;
                    border-radius: .16rem;
                }
            }
        }

        .dots {
            position: absolute;
            right: 0;
            left: 0;
            bottom: .24rem;
            text-align: center;
            font-size: 0;

            .dot {
                display: inline-block;
                margin: 0 .08rem;
                width: .16rem;
                height: .16rem;
                border-radius: 50%;
                background-color: $color-text-grey;

                &.active {
                    width: .4rem;
                    border-radius: .1rem;
                    background-color: $color-background;
                }
            }
        }
    }
</style>