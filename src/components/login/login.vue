<template>
    <div class="login-page">
        <div class="top">
            <div class="goToBack icon-back" @click="handleBack"></div>
            <div class="logo"></div>
        </div>
        <!--        http://sjbz.fd.zol-img.com.cn/t_s768x1280c/g5/M00/00/02/ChMkJlfJU6qIZvmRAD-T1_szgssAAU9rwGwTdYAP5Pv071.jpg-->
        <div class="login-bg"
             :style="{backgroundImage: 'url(http://imgsrc.baidu.com/forum/pic/item/5e4f4aed2e738bd4ab44effcaf8b87d6257ff995.jpg)'}">
        </div>

        <div :class="['container']">
            <div class="login-wrapper">
                <div v-show="route !== 'index'">
                    <div class="input-box">
                        <input class="input" type="text" placeholder="请输入手机号" maxlength="11">
                    </div>
                    <div class="input-box">
                        <input class="input" type="password" placeholder="请输入密码" maxlength="16">
                    </div>
                    <div class="input-box" v-show="route === 'register' || route === 'forget'">
                        <input class="input" type="text" placeholder="请输入验证码" maxlength="6">
                        <p class="btn">获取验证码</p>
                    </div>
                    <p class="forget" v-show="route === 'login'" @click="changeRouter('forget')">忘记密码？</p>
                </div>
            </div>

            <div class="btn-container">

                <div class="btn-box">
                    <div class="btn-con"
                         v-show="route === 'login' || route === 'index'"
                         @click="changeRouter('login')">
                        <i class="icon-circleRight"></i>
                        <span class="text">登录</span>
                    </div>
                </div>

                <div class="btn-box"
                     v-show="route === 'register' || route === 'index'"
                     @click="changeRouter('register')">
                    <div class="btn-con">
                        <i class="icon-circleRight"></i>
                        <span class="text">注册</span>
                    </div>
                </div>

                <div class="btn-box" v-show="route !== 'index'" @click="changeRouter('index')">
                    <div class="btn-con">
                        <i class="icon-circleLeft"></i>
                        <span class="text">返回</span>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                route: 'index', // index 默认 login登录 register 注册 forget 忘了密码
            }
        },
        methods: {
            handleBack() {
                this.$router.go(-1);
            },
            changeRouter(route) {
                this.route = route;
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet">
    @import "static/scss/variable.scss";
    @import "static/scss/mixin.scss";

    .login-page {
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
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: .8rem;
        z-index: 999;

        .goToBack {
            display: block;
            width: .8rem;
            height: .8rem;
            font-size: $font-size-medium;
            font-family: iconfont;
            text-align: center;
            line-height: .8rem;
            color: $color-icon-default;
        }

        .logo {
            position: absolute;
            right: .3rem;
            top: .3rem;
            width: 1rem;
            height: 1rem;
            @include bg-cover('../../static/images/logo.png');
        }
    }

    .login-bg {
        position: relative;
        height: 100%;
        @include bg-coverAndCenter();
        filter: blur(2px) opacity(90%);
    }

    .container {
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        position: absolute;
        display: flex;
        flex-flow: column;
        justify-content: center;

        .login-wrapper {
            flex-grow: 1;
            display: flex;
            flex-flow: column;
            justify-content: center;
            align-items: center;
            width: 100%;

            .input-box {
                display: flex;
                align-items: center;
                width: 6rem;
                overflow: hidden;
                border-bottom: 1px solid $color-background;

                + .input-box {
                    margin-top: .6rem;
                }

                .input {
                    flex-grow: 1;
                    width: 100%;
                    padding: .3rem;
                    font-size: $font-size-medium-x;
                    background: none;
                    border: none;
                    outline: none;
                    color: $color-text-w;
                }

                .btn {
                    flex-shrink: 0;
                    line-height: .6rem;
                    font-size: $font-size-medium-x;
                    color: $color-text-w;
                }
            }

            .forget {
                font-size: $font-size-small;
                color: $color-text-w;
            }
        }


        .btn-container {
            flex-grow: 0;
            flex-shrink: 0;
            width: 100%;
            opacity: .8;
            padding-bottom: 1rem;

            .btn-box {
                display: flex;
                justify-content: flex-end;
                width: 100%;

                + .btn-box {
                    margin-top: .3rem;
                }

                .btn-con {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 2rem;
                    height: .8rem;
                    border-top-left-radius: .8rem;
                    border-bottom-left-radius: .8rem;
                    font-size: $font-size-medium-x;
                    color: $color-text-w;
                    background-color: $color-font-theme;

                    .icon-circleLeft, .icon-circleRight {
                        font-size: .6rem;
                        font-family: iconfont;
                    }

                    .text {
                        margin-left: .3rem;
                    }
                }
            }
        }

        input::-webkit-input-placeholder {
            color: $color-text-g;
        }

        .register-wrapper {

        }
    }
</style>