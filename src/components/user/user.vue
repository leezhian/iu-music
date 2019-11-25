<template>
    <div class="user-page">
        <div class="header">
            <div class="avatar"></div>
            <div class="info" v-show="false">
                <p class="name">IU</p>
                <p class="vip icon-vip"></p>
            </div>
            <router-link to="/login" tag="div" class="login-btn">未登录</router-link>
        </div>

        <div class="vip-wrapper">
            <div class="tips"><i class="icon-vip"></i></div>
            <div class="btn">开通</div>
        </div>

        <div class="container">
            <div class="item" @click="handleJump('like')">
                <div class="icon icon-noLike"></div>
                <p class="title">我喜欢的</p>
                <div class="icon icon-rightBack"></div>
            </div>
            <div class="item" @click="handleJump('lately')">
                <div class="icon icon-lately"></div>
                <p class="title">最近播放</p>
                <div class="icon icon-rightBack"></div>
            </div>
            <div class="item">
                <div class="icon icon-lately"></div>
                <p class="title">关于</p>
                <div class="icon icon-rightBack"></div>
            </div>
        </div>

        <router-view></router-view>
    </div>
</template>

<script>

    export default {
        created() {
        },
        data() {
            return {}
        },
        methods: {
            handleJump(route) {
                this.$router.push({
                    path: `/user/${route}`
                });
            }
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

        .header {
            display: flex;
            align-items: center;
            padding: .3rem;

            .avatar {
                flex-shrink: 0;
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
                background-color: $color-text-grey;
            }

            .info {
                flex-grow: 1;
                margin-left: .3rem;

                .name {
                    font-size: $font-size-medium;
                    @include no-wrap();
                }

                .vip {
                    font-size: $font-size-large-x;
                    font-family: iconfont;
                }
            }

            .login-btn {
                margin-left: .3rem;
                font-size: $font-size-medium;
            }
        }

        .vip-wrapper {
            padding: .2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: .2rem auto 0;
            width: 6rem;
            height: 1rem;
            border-top-left-radius: .2rem;
            border-top-right-radius: .2rem;
            background-color: $color-text-theme;
            background-image: url(../../static/images/logo.png);
            background-repeat: no-repeat;
            background-position: top center;

            .tips {
                font-family: iconfont;
                color: $color-text-white;

                i {
                    font-size: .5rem;
                }
            }

            .btn {
                font-size: $font-size-medium;
                color: $color-text-white;
            }
        }

        .container {
            border-top: 1px solid $color-nav-background;

            .item {
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

                    &.icon-rightBack {
                        border-bottom: 1px solid $color-nav-background;
                        font-size: $font-size-large;
                    }
                }

                .title {
                    flex-grow: 1;
                    line-height: 1rem;
                    font-size: $font-size-medium;
                    border-bottom: 1px solid $color-nav-background;
                    @include no-wrap();
                }
            }

        }
    }


</style>