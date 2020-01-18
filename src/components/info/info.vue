<template>
  <div class="info-page">
    <div class="top">
      <div class="goToBack icon-back" @click="handleBack"></div>
      <p class="title">我的资料</p>
    </div>

    <div class="container">
      <ul class="module-list">
        <li class="list-item">
          <span class="title">头像</span>
          <div class="info-box">
            <div class="avatar" :style="{backgroundImage: `url(${userInfo.avatar})`}"></div>
            <div class="right icon-rightBack"></div>
          </div>
        </li>

        <li class="list-item" @click="showDialog = true">
          <span class="title">昵称</span>
          <div class="info-box">
            <div class="info">{{userInfo.username}}</div>
            <div class="right icon-rightBack"></div>
          </div>
        </li>
      </ul>
    </div>

    <van-dialog
        v-model="showDialog"
        title="修改昵称"
        confirm-button-color="#9370DB"
        confirm-button-text="确认修改"
        show-cancel-button
        @confirm="updateName(1)"
        @cancel="updateName(0)"
        :before-close="beforeClose"
    >
      <input class="dialog-input"
             type="text"
             v-model="username"
             placeholder="请输入昵称，长度不可超过16个字符"
             maxlength="16"/>
    </van-dialog>
  </div>
</template>

<script>
  import {Dialog} from 'vant';
  import {mapGetters, mapActions} from 'vuex';

  export default {
    created() {

    },
    data() {
      return {
        username: '',
        showDialog: false,
        isAllowClose: true, // 是否允许关闭
      }
    },
    methods: {
      handleBack() {
        this.$router.go(-1);
      },
      beforeClose(action, done) {
        done(this.isAllowClose);
      },
      /**
       * 修改名字
       * @param type 是否修改 0代表取消 1代表确认
       */
      updateName(type) {
        this.isAllowClose = true;
        if (!type) {
          return;
        }

        if (this.username.trim() == '') {
          this.$toast('昵称不许为空');
          this.isAllowClose = false;
          return;
        }

        const res = this.setUserInfo(this.username);
        if (res) {
          this.username = '';
        }
      },
      ...mapActions({
        setUserInfo: 'setUsername'
      })
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    components: {
      [Dialog.Component.name]: Dialog.Component
    }
  }
</script>

<style lang="scss" scoped>
  @import "static/scss/variable.scss";
  @import "static/scss/mixin.scss";

  .info-page {
    position: fixed;
    z-index: 50;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    background-color: $color-html-background;
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

  .container {
    .module-list {
      display: block;
      margin-top: 10px;
      width: 100%;
      background-color: $color-background;

      .list-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: .3rem;
        padding-right: .3rem;
        width: 100%;
        height: 1.1rem;

        + .list-item {
          border-top: 1px solid $color-search-background;
        }
      }
    }
  }

  .list-item {
    .title {
      font-size: $font-size-medium;
    }

    .info-box {
      display: flex;
      align-items: center;
      color: #999;
      font-size: $font-size-medium-s;

      .info {
      }

      .avatar {
        width: .9rem;
        height: .9rem;
        border-radius: 50%;
        background-color: $color-text-grey;
        @include bg-coverAndCenter();
      }

      .right {
        flex-shrink: 0;
        margin-left: .1rem;
        font-family: iconfont;
      }
    }
  }

  .dialog-input {
    margin-top: .3rem;
    margin-bottom: .3rem;
    width: 100%;
    height: .8rem;
    padding-left: .2rem;
    padding-right: .2rem;
    font-size: $font-size-medium-s;
    line-height: 1.5;
    text-align: center;
  }
</style>