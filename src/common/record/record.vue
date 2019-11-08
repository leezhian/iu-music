<template>
    <div class="record">
        <div class="record-box">
            <div class="record-item"
                 v-for="item in recordList"
                 :key="item.id"
                 ref="recordItem">
                <div class="record-cover"
                     :style="{'height': `${recordH}px`, 'background-image': `url(${item.cover})`}">
                    <div class="listen-info">
                        <i class="icon icon-smallPlay"></i>
                        <span class="num">{{item.num}}</span>
                    </div>
                </div>
                <div class="record-info">
                    <p class="title">{{item.title}}</p>
                    <p class="owner">{{item.owner}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            if (this.recordList.length) {
                this.recordH = this.$refs.recordItem[0].clientWidth;
                window.addEventListener('resize', () => {
                    this.recordH = this.$refs.recordItem[0].clientWidth;
                });
            }
        },
        beforeDestroy() {
            window.addEventListener('resize', () => {
                this.recordH = this.$refs.recordItem[0].clientWidth;
            });
        },
        data() {
            return {
                recordH: 0,
                recordList: [
                    {
                        id: 1,
                        owner: '李知恩',
                        title: '华语流行|song',
                        cover: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=205027172,1100377634&fm=179&app=42&f=JPEG?w=121&h=140&s=BD81F01547036D477A94CAC90300E0B7',
                        num: '11万'
                    },
                    {
                        id: 2,
                        owner: '李知恩',
                        title: '华语流行|song1111111111111111111111111111111',
                        cover: 'https://y.gtimg.cn/music/photo_new/T002R800x800M000004M1mvM3Hpdrn_2.jpg?max_age=2592000',
                        num: '11万'
                    },
                    {
                        id: 3,
                        owner: '李知恩',
                        title: '华语流行|song',
                        cover: 'https://y.gtimg.cn/music/photo_new/T002R800x800M000002mU11Z1z6z3W_1.jpg?max_age=2592000',
                        num: '11万'
                    },
                    {
                        id: 4,
                        owner: '李知恩',
                        title: '华语流行|song',
                        cover: 'https://y.gtimg.cn/music/photo_new/T002R800x800M000003AtIEo0ydggX_1.jpg?max_age=2592000',
                        num: '11万'
                    }
                ]
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
        margin-bottom: .1rem;
        width: 48%;

        .record-cover {
            position: relative;
            width: 100%;
            border-radius: .2rem;
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
                font-size: $font-size-small;
                @include no-wrap();
            }

            .owner {
                font-size: $font-size-small-s;
                color: $color-grey-background;
            }
        }
    }
</style>