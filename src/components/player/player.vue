<template>
    <div class="player">
        <transition name="player">
            <div class="player-page" v-if="isBigPlayer">
                <div class="player-header">
                    <div class="goToBack icon-back" @click="changePlayer(false)"></div>
                    <div class="title-box">
                        <p class="sing-name">夜信</p>
                        <p class="singer">IU</p>
                    </div>
                    <div class="like-btn icon-noLike"></div>
                </div>

                <div class="player-container">
                    <div class="cd-wrapper">
                        <div class="cd play">
                            <img class="cd-img"
                                 src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573478362532&di=f88ceb288ac93bc766849914a3bf310b&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201506%2F21%2F20150621222230_KieHX.thumb.700_0.jpeg"
                                 alt="">
                            <div class="wave"></div>
                            <div class="wave"></div>
                        </div>
                    </div>
                </div>

                <div class="player-footer">
                    <div class="progressBar-box">
                        <div class="time">00:00</div>

                        <div class="progressBar">
                            <div class="progress">
                            </div>
                        </div>

                        <div class="time">03:38</div>
                    </div>
                    <div class="tools">
                        <div class="btn icon-loop"></div>
                        <div class="btn icon-prev"></div>
                        <div class="btn playBtn icon-play"></div>
                        <div class="btn icon-next"></div>
                        <div class="btn icon-menu"></div>
                    </div>
                </div>
            </div>
        </transition>

        <mini-player @changePlayer="changePlayer" v-if="!isBigPlayer"></mini-player>
    </div>
</template>

<script>
    import MiniPlayer from 'common/mini-player/mini-player';

    export default {
        data() {
            return {
                isBigPlayer: false
            }
        },
        methods: {
            changePlayer(show) {
                this.isBigPlayer = show;
            }
        },
        components: {MiniPlayer}
    }
</script>

<style scoped lang="scss" rel="stylesheet">
    @import "static/scss/variable.scss";
    @import "static/scss/mixin.scss";

    .player-page {
        display: flex;
        align-items: center;
        flex-flow: column;
        position: fixed;
        z-index: 999;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to top, #3a2f54, #544a40, #38363c);;
    }

    .player-header {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        width: 100%;
        height: 1rem;
        font-size: $font-size-medium;
        text-align: center;
        color: $color-text-w;

        .goToBack {
            font-family: iconfont;
            flex-shrink: 0;
            width: 1rem;
            height: 100%;
            line-height: 1rem;
        }

        .title-box {
            flex-grow: 1;

            .sing-name {

            }

            .singer {
                font-size: $font-size-small;
                font-weight: lighter;
            }
        }

        .like-btn {
            font-family: iconfont;
            flex-shrink: 0;
            width: 1rem;
            height: 100%;
            line-height: 1rem;
        }
    }

    @keyframes playerRotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes enlargeWave {
        from {
            transform: scale(1, 1);
        }
        to {
            transform: scale(1.5, 1.5);
            opacity: 0;
        }
    }

    .player-container {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding-top: .2rem;
        padding-bottom: .2rem;

        .cd-wrapper {
            width: 5rem;
            height: 5rem;

            .cd {
                position: relative;
                width: 100%;
                height: 100%;
                border: 4px solid $color-progress-background;
                border-radius: 50%;

                &.play {
                    animation: playerRotate 20s linear infinite;

                    .wave:nth-of-type(1) {
                        animation: enlargeWave 2s linear infinite;
                    }

                    .wave:nth-of-type(2) {
                        animation: enlargeWave 2s linear 1s infinite;
                    }
                }

                .cd-img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    @include bg-coverAndCenter();
                }

                .wave {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    border: 2px solid #9a8192;
                }
            }
        }
    }


    .player-footer {
        flex-shrink: 0;
        width: 100%;
        padding-bottom: .6rem;

        .progressBar-box {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: .3rem;

            .progressBar {
                /*margin: 0 auto;*/
                margin-left: .2rem;
                margin-right: .2rem;
                width: 5rem;
                height: 2px;
                border-radius: 1px;
                background-color: $color-progress-background;

                .progress {
                    position: relative;
                    width: 90%;
                    height: 2px;
                    background-color: $color-font-theme;

                    &::after {
                        position: absolute;
                        content: '';
                        right: 0;
                        top: 50%;
                        transform: translate(50%, -50%);
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background-color: #fff;
                    }
                }
            }

            .time {
                color: $color-progress-background;
                font-weight: lighter;
                font-size: $font-size-small-s;
            }
        }

        .tools {
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 100%;
            height: .9rem;
            padding-left: .6rem;
            padding-right: .6rem;

            .btn {
                width: .9rem;
                height: 100%;
                text-align: center;
                line-height: .9rem;
                font-size: $font-size-large-x;
                font-family: iconfont;
                color: $color-text-w;

                &.playBtn {
                    font-size: .9rem;
                }
            }
        }
    }

    .player-enter-active, .player-leave-active {
        transition: all .3s;
    }

    .player-enter, .player-leave-to {
        transform: translateX(100%);
    }
</style>