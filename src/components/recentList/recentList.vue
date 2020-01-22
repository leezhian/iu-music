<template>
  <div class="recentList-page" name="page">
    <div class="top">
      <div class="goToBack icon-back" @click="handleBack"></div>
      <p class="title">{{routeType == 'like' ? '我喜欢的' : (routeType == 'collect' ? '我的收藏' : '试听列表')}}</p>
    </div>

    <div class="nav" v-if="routeType == 'collect'">
      <div :class="['item', {'active': navActiveId == item.id}]"
           v-for="item in nav"
           :key="item.id"
           @click="handleClickNav(item)">
        {{item.title}}
      </div>
    </div>

    <div class="tools-wrapper" v-if="routeType != 'collect'">
      <div class="play-btn">
        <i class="icon-pause"></i>
        <span class="title">全部播放 ({{songList.length}})</span>
      </div>
    </div>

    <scroll class="song-wrap"
            :watch-data="songList"
            ref="list">
      <div>
        <song-list :song-list="songList"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
  import songList from "common/song-list/song-list";
  import {getLikeSongs} from 'api/user';

  export default {
    created() {
      this.routeType = this.$route.params.type;
      switch (this.routeType) {
        case 'like':
          // 我喜欢的
          getLikeSongs().then(res => {
            if (res.code == 200) {
              _.forEach(res.data, item => {
                let singer = '';
                if (item.singerList.length > 1) {
                  _.forEach(item.singerList, value => {
                    singer += value.singerName + '/';
                  });
                } else {
                  singer = item.singerList[0].singerName + '/';
                }
                item.singer = singer.substring(0, singer.length - 1);
              });

              this.songList = res.data;
            }
          });
          break;
        case 'collect':
          // 我的收藏
          break;
        case 'audition':
          // 试听列表
          break;
      }
    },
    data() {
      return {
        nav: [
          {
            id: 1,
            title: '专辑'
          }
        ],
        navActiveId: 1,
        songList: [], // 歌曲列表
        routeType: ''
      }
    },
    methods: {
      handleBack() {
        this.$router.go(-1);
      },
      handleClickNav(navItem) {
        this.navActiveId = navItem.id;
      }
    },
    components: {
      songList
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet">
  @import "static/scss/variable.scss";
  @import "static/scss/mixin.scss";

  .recentList-page {
    position: fixed;
    z-index: 50;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    background-color: $color-background;
  }

  .top {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    height: .8rem;
    background-color: rgba(147, 112, 219, .3);

    .goToBack {
      position: absolute;
      top: 0;
      left: 0;
      width: .8rem;
      height: .8rem;
      font-size: $font-size-medium;
      font-family: iconfont;
      text-align: center;
      line-height: .8rem;
    }

    .title {
      flex-grow: 1;
      text-align: center;
      font-size: $font-size-medium;
    }
  }

  .nav {
    display: flex;
    /*justify-content: center;*/
    align-items: center;
    width: 100%;
    height: .8rem;
    background-color: rgba(147, 112, 219, .3);

    .item {
      position: relative;
      /*flex-grow: 1;*/
      flex-shrink: 0;
      width: 1.6rem;
      height: 100%;
      line-height: .8rem;
      text-align: center;
      font-size: $font-size-medium;
      overflow: hidden;

      &.active {
        color: $color-text-theme;

        &::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 30%;
          height: 2px;
          border-radius: 2px;
          background-color: $color-text-theme;
        }
      }
    }
  }

  .tools-wrapper {
    padding: .2rem;

    .play-btn {
      display: flex;
      align-items: center;
      color: $color-text-theme;

      .icon-pause {
        font-family: iconfont;
        font-size: $font-size-large-x;
      }

      .title {
        margin-left: .1rem;
        font-size: $font-size-medium;
      }
    }
  }

  .song-wrap {
    height: 100%;
    overflow: hidden;
  }

  .page-enter-active, .page-leave-active {
    transition: all .3s;
  }

  .page-enter, .page-leave-to {
    transform: translateX(100%);
  }
</style>