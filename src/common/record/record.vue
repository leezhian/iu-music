<template>
    <div class="record">
        <p class="record-title">本周热销</p>
        <div class="record-box">
            <div class="record-item"
                 v-for="(item, index) in recordList"
                 :key="item.id"
                 ref="recordItem"
                 @click="handleClickRecord(index)">
                <div class="record-cover"
                     v-lazy:background-image="item.cover"
                     :style="{'height': `${recordH}px`}">
                    <div class="listen-info">
                        <i class="icon icon-smallPlay"></i>
                        <span class="num">{{item.total}}</span>
                    </div>
                </div>
                <div class="record-info">
                    <p class="title">{{item.recordName}}</p>
                    <p class="owner">{{item.singer}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            recordList: {
                type: Array,
                default: []
            }
        },
        mounted() {
            if (this.recordList.length) {
                this._resetRecordCover();
                window.addEventListener('resize', this._resetRecordCover);
            }
        },
        beforeDestroy() {
            window.addEventListener('resize', this._resetRecordCover);
        },
        data() {
            return {
                recordH: 0, // 专辑海报高度
                recordList: [], // 专辑列表
            }
        },
        methods: {
            _resetRecordCover() {
                if (this.recordList.length) {
                    this.recordH = this.$refs.recordItem[0].clientWidth;
                }
            },
            handleClickRecord(index) {
                this.$emit('handleClickRecord', index);
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet">
    @import "static/scss/variable.scss";
    @import "static/scss/mixin.scss";

    .record {
        position: relative;
        width: 100%;
        background-color: $color-background;
    }

    .record-title {
        padding-top: .3rem;
        padding-left: .3rem;
        padding-right: .3rem;
        font-size: $font-size-large;
        font-weight: bold;

    }

    .record-box {
        position: relative;
        display: flex;
        flex-flow: wrap;
        justify-content: space-between;
        width: 100%;
        padding: .3rem;
    }

    .record-item {
        overflow: hidden;
        margin-bottom: .3rem;
        width: 48%;

        .record-cover {
            position: relative;
            width: 100%;
            border-radius: .14rem;
            @include bg-coverAndCenter();

            .listen-info {
                position: absolute;
                bottom: .1rem;
                right: .1rem;
                padding-left: .1rem;
                padding-right: .1rem;
                height: .36rem;
                line-height: .36rem;
                border-radius: .18rem;
                color: $color-text-w;
                font-size: $font-size-small-s;
                background-color: rgba(0, 0, 0, .3);

                .icon {
                    font-family: iconfont;
                }

                .num {

                }
            }
        }

        .record-info {
            margin-top: .1rem;

            .title {
                font-weight: bold;
                font-size: $font-size-medium-s;
                @include no-wrap();
            }

            .owner {
                font-size: $font-size-small-s;
                color: $color-grey-background;
            }
        }
    }
</style>