<template>
    <div>
        <div class="search-wrap">
            <input class="search" type="search" placeholder="搜索">
        </div>

        <div class="swiper-wrap">
            <div v-for="item in swiperList" :key="item.id">
                <a :href="item.linkUrl">
                    <img class="needsclick" :src="item.imgUrl" alt="" @load="loadImage">
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import slider from '../../common/slider/slider';

    export default {
        data() {
            return {
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
                ]
            }
        },
        components: {
            slider
        }
    }
</script>

<style scoped rel="stylesheet" lang="scss">
    @import "static/scss/variable.scss";

    .search-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: .8rem;

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
        width: 100%;
        overflow: hidden;
    }
</style>