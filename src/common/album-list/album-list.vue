<template>
  <div class="album-list">
    <ul v-if="albumList.length">
      <li class="album-item"
          v-for="(item, index) in albumList"
          :key="item.id"
          @click="handleClickAlbum(index)">
        <div class="cover-box">
          <img class="cover" :src="item.cover" alt="">
        </div>

        <div class="container">
          <p class="album-name">{{item.recordName}}</p>
          <p class="album-info">{{item.singer}}, <span>{{item.songIds ? item.songIds.split(',').length : 0}}</span>首</p>
        </div>
      </li>
    </ul>
    <p class="no-more" v-else>暂无收藏专辑</p>
  </div>
</template>

<script>
  export default {
    props: {
      albumList: {
        type: Array,
        default: []
      }
    },
    methods: {
      handleClickAlbum(index) {
        this.$emit('handleClickAlbum', index);
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet">
  @import "static/scss/variable.scss";
  @import "static/scss/mixin.scss";

  .album-list {
    .no-more {
      margin: 1rem 0;
      text-align: center;
      font-size: $font-size-medium;
      color: $color-text-grey;
    }

    ul {
      display: block;
      width: 100%;
      overflow: hidden;
    }

    .album-item {
      display: flex;
      align-items: center;
      margin-top: .2rem;
      padding-left: .2rem;
      padding-right: .2rem;

      .cover-box {
        width: 1.25rem;
        height: 1.1rem;
        @include bg-cover('../../static/images/album_cover.png');

        .cover {
          display: block;
          width: 1.1rem;
          height: 100%;
          border-radius: 5px;
        }
      }

      .container {
        margin-left: .2rem;

        .album-name {
          font-size: $font-size-medium-s;
        }

        .album-info {
          font-size: $font-size-small-s;
          color: $color-grey-background;
        }
      }
    }
  }
</style>