<template>
  <div class="user-page">
    <scroll class="user-content" :bounce-top="false" :bounce-bottom="false" :watch-data="[1,2]">
      <div>
        <div class="header">
          <div class="avatar"
               @click="linkToInfo"
               :style="{backgroundImage: `url(${this.isLogin ? this.userInfo.avatar : ''})`}"></div>
          <router-link to="/login" tag="div" class="login-btn" v-if="!isLogin">未登录</router-link>
          <div class="info" v-if="isLogin">
            <p class="name" @click="linkToInfo">{{this.userInfo.username}}</p>
          </div>

          <div class="vip-box">
            <p class="open-vip">开通会员></p>
          </div>
        </div>

        <div class="container">
          <!--我的音乐 start-->
          <div class="me-wrapper">
            <div class="head-box">
              <p class="title">我的音乐</p>
            </div>

            <div class="me-scrollbar" ref="myScroller">
              <ul class="me-box">
                <li class="me-item" @click="handleJump('audition')">
                  <div class="shadow">
                    <div class="center">
                      <div class="icon icon-audition"></div>
                      <p>试听列表</p>
                    </div>
                  </div>
                </li>

                <li class="me-item"
                    :style="{backgroundImage: 'url(http://d.paper.i4.cn/max/2016/12/28/14/1482908345995_299323.jpeg)'}"
                    @click="handleJump('like')">
                  <div class="shadow">
                    <div class="center">
                      <div class="icon icon-like"></div>
                      <p>我喜欢的音乐</p>
                    </div>
                  </div>
                </li>

                <li class="me-item"
                    :style="{backgroundImage: 'url(https://c-ssl.duitang.com/uploads/item/201802/05/20180205121721_lbmhl.thumb.700_0.jpg)'}">
                  <div class="shadow">
                    <div class="center">
                      <div class="icon icon-radio"></div>
                      <p>私人FM</p>
                    </div>
                    <div class="bottom">你的私人曲库</div>
                  </div>
                </li>

                <li class="me-item"
                    :style="{backgroundImage: 'url(http://b-ssl.duitang.com/uploads/item/201707/26/20170726215335_GXna8.thumb.700_0.jpeg)'}"
                    @click="handleJump('collect')">
                  <div class="shadow">
                    <div class="center">
                      <div class="icon icon-star"></div>
                      <p>收藏</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--我的音乐 end-->
          <!--歌单 start-->
          <div class="playlist-wrapper" v-if="isLogin">
            <div class="head-box">
              <p :class="['title', {'inactive': switchPlaylistType != 'me'}]" @click="switchPlaylist('me')">
                创建歌单<span>{{myPlaylist.length}}</span></p>
              <p :class="['title', {'inactive': switchPlaylistType != 'like'}]" @click="switchPlaylist('like')">
                收藏歌单<span>{{likePlaylist.length}}</span></p>
            </div>

            <ul class="playlist-box">
              <li class="playlist-item"
                  v-for="(item, index) in getList"
                  :key="item.id"
                  @click="handlePlaylist(index)">
                <div class="item-img" :style="{backgroundImage: `url(${item.cover})`}"></div>
                <div class="info-box">
                  <p class="name">{{item.recordName}}</p>
                  <p class="total"><span>{{item.songsTotal ? item.songsTotal : 0}}</span> 首</p>
                </div>
              </li>

              <li class="playlist-item" v-show="switchPlaylistType == 'me'">
                <div class="item-img icon icon-add"></div>
                <div class="info-box">
                  <p class="name">新建歌单</p>
                </div>
              </li>
            </ul>
          </div>
          <!--歌单 end-->
          <div class="tool-wrapper">
            <div class="tool-item">
              <div class="icon icon-set"></div>
              <p class="title">设置</p>
              <div class="icon icon-rightBack">
              </div>
            </div>

            <div class="tool-item">
              <div class="icon icon-about"></div>
              <p class="title">关于</p>
              <div class="icon icon-rightBack">
              </div>
            </div>
          </div>
        </div>

        <div class="footer" v-if="isLogin">
          <div class="logout" @click="logout">退出登录</div>
        </div>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import BScroll from '@better-scroll/core';
  import Scroll from 'common/scroll/scroll';
  import {mapMutations, mapGetters} from 'vuex';
  import _ from 'lodash';

  import {getUserInfo, getMyPlaylist, getRecordList} from 'api/user';
  import {SET_USER_INFO, SET_USER_TOKEN, SET_RECORD_DETAIL} from 'store/mutation-types';

  import {resetUserInfo} from 'static/js/utils';

  export default {
    created() {
      // 判断是否登录
      if (this.userToken) {
        this.isLogin = true;
        // 刷新页面数据
        setTimeout(() => {
          getUserInfo().then(res => {
            if (res.code == 200) {
              this.setUserInfo(res.data);
            }
          });

          getMyPlaylist().then(res => {
            if (res.code == 200) {
              this.myPlaylist = res.data;
              // 把songIds转为数组
              _.forEach(this.myPlaylist, (value) => {
                if (!value.songIds) {
                  return;
                }
                value.songsTotal = value.songIds.split(',').length;
              });
            }
          });

          getRecordList(2).then(res => {
            if (res.code == 200) {
              this.likePlaylist = res.data || [];
              _.forEach(this.likePlaylist, (value) => {
                if (!value.songIds) {
                  return;
                }
                value.songsTotal = value.songIds.split(',').length;
              });
            }
          });
        }, 500);
      }
    },
    mounted() {
      this._initScroll();
    },
    data() {
      return {
        isLogin: false,
        switchPlaylistType: 'me', // me 我的 like 收藏歌单
        myPlaylist: [], // 我创建的歌单
        likePlaylist: [], // 收藏的歌单
      }
    },
    methods: {
      // 初始化滚动
      _initScroll() {
        new BScroll(this.$refs.myScroller, {
          scrollY: false,
          scrollX: true
        });
      },
      // 切换歌单类型
      switchPlaylist(type) {
        if (type == this.switchPlaylistType) {
          return;
        }

        this.switchPlaylistType = type;
      },
      /**
       * 点击歌单
       * @param index 索引
       */
      handlePlaylist(index) {
        // 根据类型选择列表
        const recordList = this.switchPlaylistType == 'me' ? this.myPlaylist[index] : this.likePlaylist[index];
        const recordId = recordList.id;
        this.$router.push({
          path: `/recommend/playlist/${recordId}`,
          query: {
            recordtype: 2 // 封面类型
          }
        });
        // 修改store的数据
        this.setRecordDetail(recordList);
      },
      handleJump(route) {
        this.$router.push({
          path: `/user/${route}`
        });
      },
      // 跳转到个人信息页
      linkToInfo() {
        if (!this.isLogin) {
          return;
        }
        this.$router.push({
          path: `/user/info`
        });
      },
      // 退出登录
      logout() {
        localStorage.removeItem('token');
        // 重置用户信息和token
        resetUserInfo();
        this.setToken(null);
        // 重载页面
        this.$router.go(0);
      },
      ...mapMutations({
        setUserInfo: SET_USER_INFO,
        setToken: SET_USER_TOKEN,
        setRecordDetail: SET_RECORD_DETAIL
      })
    },
    components: {
      Scroll
    },
    computed: {
      // 计算渲染哪个列表
      getList() {
        return this.switchPlaylistType == 'me' ? this.myPlaylist : this.likePlaylist;
      },
      ...mapGetters(['userToken', 'userInfo'])
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet">
  @import "static/scss/variable.scss";
  @import "static/scss/mixin.scss";

  .user-page {
    position: absolute;
    z-index: 10;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 1.2rem;
    overflow: hidden;

    .user-content {
      height: 100%;
      overflow: hidden;
    }
  }


  .header {
    display: flex;
    align-items: center;
    /*padding: .3rem;*/
    padding: .3rem .3rem 1.2rem;
    background-color: $color-text-theme;

    .avatar {
      flex-shrink: 0;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background-color: $color-text-grey;
      @include bg-coverAndCenter();
    }

    .info {
      flex-grow: 1;
      margin-left: .3rem;
      color: $color-text-white;

      .name {
        font-size: $font-size-medium;
        @include no-wrap();
      }
    }

    .vip-box {
      height: 100%;

      .open-vip {

      }
    }

    .login-btn {
      flex-grow: 1;
      margin-left: .3rem;
      font-size: $font-size-medium;
    }
  }

  .container {
    transform: translateY(-.5rem);
    padding-top: 20px;
    width: 100%;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: $color-background;

    .head-box {
      display: flex;
      width: 100%;
      padding: 0 .24rem .3rem;

      .title {
        margin-right: .3rem;
        font-size: $font-size-medium-s;
        font-weight: bold;

        &.inactive {
          color: #999;
        }

        span {
          font-size: $font-size-small-s;
        }
      }
    }
  }

  .me-wrapper {
    padding-bottom: .5rem;

    .me-scrollbar {
      height: 3rem;

      .me-box {
        display: flex;
        flex-wrap: nowrap;
        width: 9.6rem;

        .me-item {
          display: block;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
          margin-left: .24rem;
          width: 2.1rem;
          height: 3rem;
          border-radius: .16rem;
          @include bg-coverAndCenter();

          &:last-of-type {
            margin-right: .24rem;
          }
        }
      }
    }

    .me-item {
      .shadow {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .2);
      }

      .center {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        font-family: iconfont;
        text-align: center;
        font-size: $font-size-small;
        color: $color-text-white;

        .icon {
          font-size: $font-size-large;

          &.icon-like {
            color: #FF4741;
          }
        }
      }

      .bottom {
        position: absolute;
        bottom: .1rem;
        width: 100%;
        text-align: center;
        color: $color-text-white;
      }
    }
  }

  .playlist-wrapper {
    margin-bottom: .2rem;

    .playlist-box {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding-left: .24rem;
      padding-right: .24rem;
      width: 100%;

      .playlist-item {
        margin-bottom: .2rem;
        display: flex;
        align-items: center;
        overflow: hidden;
        flex-shrink: 0;
        width: 3.2rem;
      }
    }

    .playlist-item {
      .item-img {
        position: relative;
        flex-shrink: 0;
        border-radius: .1rem;
        width: 1.1rem;
        height: 1.1rem;
        font-family: iconfont;
        background-color: $color-search-background;
        @include bg-coverAndCenter();

        &.icon-add::before {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: iconfont;
          font-size: $font-size-large-x;
          color: #CACACA;
        }
      }

      .info-box {
        flex-grow: 1;
        overflow: hidden;
        margin-left: .1rem;

        .name {
          font-size: $font-size-small;
          @include no-wrap();
        }

        .total {
          color: $color-grey-background;
        }
      }
    }
  }

  .tool-wrapper {
    border-top: 5px solid $color-html-background;

    .tool-item {
      position: relative;
      display: flex;
      width: 100%;
      height: 1rem;

      .icon {
        flex-shrink: 0;
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        font-size: .5rem;
        font-family: iconfont;
      }

      .icon-rightBack {
        position: absolute;
        right: 0;
        color: $color-text-grey;
        font-size: $font-size-large;
      }

      .title {
        flex-grow: 1;
        line-height: 1rem;
        font-size: $font-size-medium;
        @include no-wrap();
      }

      + .tool-item {
        .title {
          border-top: 1px solid $color-search-background;
        }
      }
    }
  }

  .footer {
    margin-top: -.5rem;
    border-top: 5px solid $color-html-background;

    .logout {
      height: 1rem;
      text-align: center;
      line-height: 1rem;
      font-size: $font-size-medium;
      color: $color-text-theme;
      background-color: #fff;
    }
  }


</style>