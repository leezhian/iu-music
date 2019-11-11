<template>
    <div class="recommend-page">
        <div class="search-wrap">
            <input class="search" type="search" placeholder="搜索">
        </div>

        <div class="swiper-wrap">
            <slider>
                <div v-for="item in swiperList" :key="item.id">
                    <a :href="item.linkUrl">
                        <img :src="item.imgUrl" alt="">
                    </a>
                </div>
            </slider>
        </div>

        <div class="playList-container">
            <div class="playList-header">
                <p class="title">推荐歌单</p>
                <div class="btn">歌单广场</div>
            </div>
            <ul class="cover-item-box">
                <li class="cover-item" v-for="item in playList" :key="item.id" ref="coverItem">
                    <div class="cover-img"
                         :style="{'background-image': `url(${item.imgUrl})`, 'height': coverImgH + 'px'}">
                        <div class="cover-label">
                            <i class="icon icon-smallPlay"></i>
                            <span class="num">11万</span>
                        </div>
                    </div>
                    <p class="cover-content">{{item.title}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import slider from 'common/slider/slider';

    export default {
        mounted() {
            const self = this;
            if (this.playList.length) {
                this._resetCoverH();

                window.addEventListener('resize', self._resetCoverH);
            }
        },
        beforeDestroy() {
            const self = this;
            window.removeEventListener('resize', self._resetCoverH);
        },
        data() {
            return {
                coverImgH: 1,
                swiperList: [
                    {
                        id: '1',
                        imgUrl: 'http://p1.music.126.net/SL_Mb2UlPzIf1qLa-pdvZQ==/109951164473070267.jpg?imageView&quality=89',
                        linkUrl: 'aa'
                    },
                    {
                        id: '2',
                        imgUrl: 'http://p1.music.126.net/EKY0qBxMWxqsZDMK6NE8OA==/109951164472787221.jpg?imageView&quality=89',
                        linkUrl: 'aa'
                    },
                    {
                        id: '3',
                        imgUrl: 'http://p1.music.126.net/QxlWiwTaS-Q_X-Ab16oaMg==/109951164472793774.jpg?imageView&quality=89',
                        linkUrl: 'aa'
                    }
                ],
                playList: [
                    {
                        id: 1,
                        imgUrl: 'https://p.qpic.cn/music_cover/CWicWfBTb9hhZU7ia18JvSxHia9ECbVIWjnWlN4SXqMODqK7splEZFOyg/300?n=1',
                        title: '「国语」越苦的情歌，越要敢唱'
                    },
                    {
                        id: 2,
                        imgUrl: 'https://p.qpic.cn/music_cover/4R8XfMNqF63nu0rAgricJR6AVsDn053CqP3JYl4676kf2Fib3OD2BPIQ/300?n=1',
                        title: '一生太长，我只想对你说五个字'
                    },
                    {
                        id: 3,
                        imgUrl: 'https://p.qpic.cn/music_cover/R8unPZMA4Vp5v2Ms96bst9Ovu8dH3yFr4sugVudVJ9tOUoxCGKJZLQ/300?n=1',
                        title: '致前任：何来亏欠，我敢给就敢心碎'
                    },
                    {
                        id: 4,
                        imgUrl: 'https://p.qpic.cn/music_cover/ezXpob9biaedyoUWFJDttESkgXCPptb7kLQSsL2wCf4aJP9MEUP5ZCg/300?n=1',
                        title: '粤语回忆录：曾经让你伤感流泪的歌声'
                    },
                    {
                        id: 5,
                        imgUrl: 'https://p.qpic.cn/music_cover/jXFicBvicUcfIWSoCNT1OrbGDexDlNTnj22TSQd0wvfIrsYCethQqa1w/300?n=1',
                        title: '华语：明明你也很爱我，没理由爱不到结果'
                    },
                    {
                        id: 6,
                        imgUrl: 'https://p.qpic.cn/music_cover/X9lmt3gQ1KkaezXF13jX3yDqG1XgKQrnMOYq7I7ialLL5CicPmyRBABw/300?n=1',
                        title: '致前任：你以为我不会走，我以为你会留'
                    }
                ]
            }
        },
        methods: {
            // 重置推荐歌单图片高度
            _resetCoverH() {
                this.coverImgH = this.$refs.coverItem[0].clientWidth;
            }
        },
        components: {
            slider
        }
    }
</script>

<style scoped rel="stylesheet" lang="scss">
    @import "static/scss/variable.scss";
    @import "static/scss/mixin.scss";

    .recommend-page {
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 1.2rem;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .search-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 1rem;

        .search {
            display: block;
            padding-left: .2rem;
            padding-right: .2rem;
            width: 4.4rem;
            height: .6rem;
            border-radius: 3rem;
            border: none;
            outline: none;
            background-color: $color-search-background;
        }

        input::-webkit-input-placeholder {
            color: $color-text-g;
        }
    }

    .swiper-wrap {
        position: relative;
        width: 92%;
        /*width: 6.9rem;*/
        margin: 0 auto .3rem;
        overflow: hidden;
        border-radius: .16rem;
    }

    .playList-container {
        position: relative;
        padding: .3rem;
        width: 100%;
        border-top: 1px solid $color-nav-background;

        .playList-header {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .title {
                font-size: $font-size-medium;
                font-weight: bold;
            }

            .btn {
                height: .5rem;
                padding-left: .2rem;
                padding-right: .2rem;
                border: 1px solid $color-text-g;
                border-radius: .25rem;
                line-height: .5rem;
            }
        }

        .cover-item-box {
            display: flex;
            justify-content: space-between;
            flex-flow: wrap;
            padding-top: .3rem;
            overflow: hidden;

            .cover-item {
                display: block;
                margin-bottom: .2rem;
                width: 30%;

                .cover-img {
                    display: block;
                    width: 100%;
                    @include bg-coverAndCenter()
                }

                .cover-content {
                    display: -webkit-box;
                    overflow: hidden;
                    margin-top: .1rem;
                    width: 100%;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }

                .cover-label {
                    padding: .1rem;
                    text-align: right;
                    color: $color-text-w;

                    .icon {
                        font-family: iconfont;
                    }

                    .num {
                    }
                }
            }
        }
    }
</style>