<template>
  <transition name="player">
    <div class="record-page">
      <cover :has-back="true"
             :like-icon="true"
             :cover-img="this.recordDetail.cover"
             :isLike="recordDetail.isLike"
             @handleLike="handleLike">
        <div class="container" :style="{'background-image': `url(${this.recordDetail.cover})`}" ref="bgImage">
          <div class="info">
            <h3 class="record-name">{{this.recordDetail.recordName}}</h3>
            <p class="record-singer" v-if="recordType == 1">—— {{this.recordDetail.singer}}</p>
          </div>
          <div class="tools">
            <div class="btn" v-show="songList.length"><i class="icon-pause"></i></div>
            <div class="btn" v-if="recordType == 1"><i class="icon icon-cart"></i></div>
          </div>
          <p class="desc" v-if="recordType == 1">简介: {{this.recordDetail.description}}</p>
        </div>
      </cover>

      <div class="bg-layer" ref="layer"></div>
      <scroll class="song-wrap"
              @scroll="scroll"
              :watch-data="songList"
              :listen-scroll="listenScroll"
              :probe-type="probeType"
              ref="list">
        <div>
          <!--v-if="songList.length"-->
          <song-list @select="selectItem"
                     :song-list="songList"></song-list>
        </div>
      </scroll>
      <!--            <loading v-else></loading>-->
    </div>
  </transition>
</template>

<script>
  import Scroll from 'common/scroll/scroll';
  import cover from 'common/cover/cover';
  import songList from 'common/song-list/song-list';

  import {mapGetters, mapActions} from 'vuex';

  import {getSongList} from 'api/album';

  // 返回栏的高度
  const COVER_HEADER_H = window.document.documentElement.style.fontSize.replace(/px/, '') * 0.8;

  export default {
    created() {
      // 判断是歌单还是专辑
      if (this.$route.query.recordtype == 1) {

      } else if (this.$route.query.recordtype == 2) {
        this.recordType = 2;
      } else {
        // 跳转到错误页
      }
      this.listenScroll = true;
      this.probeType = 3;
      // 获取歌曲
      this._getSongList();
    },
    mounted() {
      this.coverImgHeight = this.$refs.bgImage.clientHeight; // 专辑图片高度
      this.minTranslateY = -this.coverImgHeight + COVER_HEADER_H; // 最小偏移量，因为往上是负的
      this.$refs.list.$el.style.top = `${this.coverImgHeight}px`; // 初始化默认list的top值
    },
    data() {
      return {
        recordType: 1, // 1 album 2 playlist
        songList: [],
        scrollY: 0
      }
    },
    methods: {
      /**
       * 获取偏移量
       * @param position
       */
      scroll(position) {
        this.scrollY = position.y;
      },
      selectItem(item, index) {
        this.selectPlay({
          list: this.songList,
          index
        })
      },
      /**
       * 点击喜欢
       */
      handleLike() {
        this.updateLikeIds({
            type: this.recordType,
            likeId: this.recordDetail.id
        });
      },
      /**
       * 获取歌曲列表
       */
      _getSongList() {
        if (JSON.stringify(this.recordDetail) == {}) {
          if (this.recordType == 1) {
            this.$router.push('/album');
            return;
          } else {
            this.$router.push('/recommend/playlist');
            return;
          }
        }
        // 获取歌曲列表
        getSongList(this.recordDetail.songIds).then(res => {
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
      },
      ...mapActions([
        'selectPlay',
        'updateLikeIds'
      ])
    },
    computed: {
      ...mapGetters(['recordDetail'])
    },
    watch: {
      scrollY(newY) {
        // 最大偏移链
        let translateY = Math.max(this.minTranslateY, newY);
        this.$refs.layer.style['transform'] = `translate3d(0, ${translateY}px, 0)`;
        this.$refs.layer.style['webkitTransform'] = `translate3d(0, ${translateY}px, 0)`;

        if (newY >= 0) {
          this.$refs.bgImage.style.height = `${this.coverImgHeight + newY}px`;
          this.$refs.list.$el.style.top = `${this.coverImgHeight + newY}px`;
        }
      }
    },
    components: {
      cover,
      songList,
      Scroll
    }
  }
</script>

<style scoped rel="stylesheet" lang="scss">
  @import "static/scss/variable.scss";

  .record-page {
    position: fixed;
    z-index: 50;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    background-color: $color-background;

    .song-wrap {
      position: absolute;
      width: 100%;
      top: 0;
      bottom: 0;
      background-color: $color-background;
      /*overflow: hidden;*/
    }

    .bg-layer {
      position: relative;
      height: 100%;
      background-color: $color-background;
    }
  }

  .player-enter-active, .player-leave-active {
    transition: all .3s;
  }

  .player-enter, .player-leave-to {
    transform: translateX(100%);
  }
</style>