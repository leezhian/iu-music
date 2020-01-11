<template>
  <div class="record">
    <p class="record-title">本周热销</p>
    <div class="record-box">
      <div class="record-item"
           v-for="(item, index) in recordList"
           :key="item.id"
           ref="recordItem"
           @click="handleClickRecord(index)">
        <div class="record-cover">
          <div class="cover" v-lazy:background-image="item.cover">
            <div class="listen-info" v-if="showListenTotal">
              <i class="icon icon-smallPlay"></i>
              <span class="num">{{item.total}}</span>
            </div>
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
      },
      showListenTotal: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
    },
    data() {
      return {
        recordList: [], // 专辑列表
      }
    },
    methods: {
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
    flex-shrink: 0;
    overflow: hidden;
    margin-bottom: .3rem;
    width: 3.3rem;
    /*width: 48%;*/

    .record-cover {
      position: relative;
      width: 100%;
      height: 2.9rem;
      @include bg-cover('../../static/images/album_cover.png');

      .cover {
        width: 3rem;
        height: 2.9rem;
        border-radius: .1rem;
        @include bg-coverAndCenter();
      }

      .listen-info {
        position: absolute;
        top: .1rem;
        right: .4rem;
        padding-left: .1rem;
        padding-right: .1rem;
        color: $color-text-white;
        font-size: $font-size-small-s;
        text-shadow: 0 0 1px #000;

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