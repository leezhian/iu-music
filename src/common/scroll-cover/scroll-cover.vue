<template>
  <Scroll class="container" :watch-data="list" :scrollY="false" :scrollX="true">
    <ul class="cover-box" ref="scrollBox">
      <li class="cover-item">
        <div class="img-box">
          <div class="img"
               :style="{backgroundImage: `url('https://y.gtimg.cn/music/photo_new/T002R300x300M000000bRc942Vz1GF_1.jpg?max_age=2592000')`}"></div>
          <div class="img-frame"></div>
        </div>
        <div class="cover-info">
          <p class="songName">BBIBBI</p>
          <p class="singer">IU</p>
        </div>
      </li>

      <li class="cover-item">
        <div class="img-box">
          <div class="img"
               :style="{backgroundImage: `url('https://y.gtimg.cn/music/photo_new/T002R300x300M000000bRc942Vz1GF_1.jpg?max_age=2592000')`}"></div>
          <div class="img-frame"></div>
        </div>
        <div class="cover-info">
          <p class="songName">BBIBBI</p>
          <p class="singer">IU</p>
        </div>
      </li>

      <li class="cover-item">
        <div class="img-box">
          <div class="img"
               :style="{backgroundImage: `url('https://y.gtimg.cn/music/photo_new/T002R300x300M000000bRc942Vz1GF_1.jpg?max_age=2592000')`}"></div>
          <div class="img-frame"></div>
        </div>
        <div class="cover-info">
          <p class="songName">BBIBBI</p>
          <p class="singer">IU</p>
        </div>
      </li>

      <li class="cover-item">
        <div class="img-box">
          <div class="img"
               :style="{backgroundImage: `url('https://y.gtimg.cn/music/photo_new/T002R300x300M000000bRc942Vz1GF_1.jpg?max_age=2592000')`}"></div>
          <div class="img-frame"></div>
        </div>
        <div class="cover-info">
          <p class="songName">BBIBBI</p>
          <p class="singer">IU</p>
        </div>
      </li>

      <li class="cover-item">
        <div class="img-box">
          <div class="img"
               :style="{backgroundImage: `url('https://y.gtimg.cn/music/photo_new/T002R300x300M000000bRc942Vz1GF_1.jpg?max_age=2592000')`}"></div>
          <div class="img-frame"></div>
        </div>
        <div class="cover-info">
          <p class="songName">BBIBBI</p>
          <p class="singer">IU</p>
        </div>
      </li>
    </ul>
  </Scroll>
</template>

<script>
  import Scroll from 'common/scroll/scroll';

  export default {
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    methods: {},
    components: {
      Scroll
    }
  }
</script>

<style lang="scss" scoped>
  @import "static/scss/variable.scss";
  @import "static/scss/mixin.scss";

  .container {
    padding-bottom: .2rem;
    width: 100%;
    overflow: hidden;
    background-color: $color-background;
  }

  .cover-box {
    display: flex;
    flex-wrap: nowrap;
    width: 12.8rem;
    /*overflow: hidden;*/
  }

  .cover-item {
    flex-shrink: 0;
    margin-left: .3rem;
    width: 2.2rem;
    overflow: hidden;

    .img-box {
      position: relative;
      width: 100%;
      height: 1.94rem;

      .img {
        width: 1.94rem;
        height: 100%;
        border-radius: .1rem;
        @include bg-coverAndCenter();
      }

      .img-frame {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        @include bg-cover('../../static/images/album_cover.png');
      }
    }

    .cover-info {
      width: 100%;
      overflow: hidden;
      font-size: $font-size-small;
      line-height: $font-size-medium-x;

      .songName {
        @include no-wrap();
      }

      .singer {
        color: $color-grey-background;
        @include no-wrap();
      }
    }
  }

</style>