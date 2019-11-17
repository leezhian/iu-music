<template>
    <div class="player" v-show="playlist.length > 0">
        <!--全屏播放器 start-->
        <transition name="player">
            <div class="player-page" v-show="fullPlayer">
                <div class="player-header">
                    <div class="goToBack icon-back" @click="back"></div>
                    <div class="title-box">
                        <p class="sing-name">{{currentSong.songName}}</p>
                        <p class="singer">{{currentSong.singer}}</p>
                    </div>
                    <div class="like-btn icon-like"></div>
                </div>
                <!--专辑封面 start-->
                <div class="player-container">
                    <div class="cd-wrapper">
                        <div :class="['cd', cdCls]">
                            <img class="cd-img"
                                 :src="currentSong.cover"
                                 alt="">
                            <div class="wave"></div>
                            <div class="wave"></div>
                        </div>
                    </div>
                </div>
                <!--专辑封面 end-->
                <div class="player-footer">
                    <div class="progressBar-box">
                        <div class="time">{{formatTime(currentTime)}}</div>

                        <div class="bar-inner" ref="progressBar">
                            <div class="progress"></div>
                            <div class="progress-btn-wrap" ref="progress">
                                <div class="progress-btn"></div>
                            </div>
                        </div>

                        <div class="time">{{formatTime(currentSong.duration)}}</div>
                    </div>
                    <div class="tools">
                        <div class="btn icon-loop"></div>
                        <div :class="['btn', 'icon-prev', disableCls]" @click="prev"></div>
                        <div :class="['btn','playBtn', playIcon]" @click="togglePlay"></div>
                        <div :class="['btn', 'icon-next', disableCls]" @click="next"></div>
                        <div class="btn icon-menu"></div>
                    </div>
                </div>
            </div>
        </transition>
        <!--mini播放器 end-->

        <!--mini播放器 start-->
        <transition name="miniPlayer" mode="out-in">
            <div class="mini-wrap" @click.stop="open" v-show="!fullPlayer">
                <div :class="['mini-player', cdCls]">
                    <img class="mini-cover" :src="currentSong.cover" alt="">
                </div>
            </div>
        </transition>
        <!--mini播放器 end-->

        <audio :src="currentSong.link" ref="audio" @canplay="canReady" @error="error" @timeupdate="updateTime"></audio>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex';
    import * as types from 'store/mutation-types';

    export default {
        data() {
            return {
                songReady: false, // 歌曲是否准备好播放
                currentTime: 0, // 当前音乐播放进度时间
            }
        },
        methods: {
            // 退出全屏播放器
            back() {
                this.setFullScreen(false);
            },
            // 打开全屏播放器
            open() {
                this.setFullScreen(true);
            },
            // 切换播放状态
            togglePlay() {
                this.updatePlayState(!this.isPlay);
            },
            // 下一首
            next() {
                // 只有准备好才可以切下一首歌
                if (!this.songReady) {
                    return;
                }

                let index = this.currentIndex + 1;
                if (index === this.playlist.length) {
                    index = 0;
                }
                this.setCurrentIndex(index);
                // 因为暂停状态下，切换歌曲会自动播放，所以要改变播放状态isPlay
                if (!this.isPlay) {
                    this.togglePlay();
                }
                this.songReady = false;
            },
            // 上一首
            prev() {
                if (!this.songReady) {
                    return;
                }

                let index = this.currentIndex - 1;
                if (index < 0) {
                    index = this.playlist.length - 1;
                }
                this.setCurrentIndex(index);
                this.songReady = false;
            },
            // 当音乐准备好会自动触发
            canReady(e) {
                this.songReady = true;
            },
            // 歌曲加载失败自动触发
            error() {
                this.songReady = true;
            },
            // 当歌曲的进度时间更新时自动触发
            updateTime(e) {
                this.currentTime = e.target.currentTime;
            },
            // 处理显示时间格式
            formatTime(interval) {
                interval = interval | 0; // 向下取整
                const minute = this._pad(interval / 60 | 0);
                const second = this._pad(interval % 60);
                return `${minute}:${second}`;
            },
            // 补0
            _pad(num, n = 2) {
                let len = num.toString().length;
                while (len < n) {
                    num = '0' + num;
                    len++
                }
                return num;
            },
            ...mapMutations({
                setFullScreen: types.SET_FULL_SCREEN,
                updatePlayState: types.UPDATE_PLAY_STATE,
                setCurrentIndex: types.SET_CURRENT_INDEX
            })
        },
        computed: {
            // 播放图标修改
            playIcon() {
                return this.isPlay ? 'icon-play' : 'icon-pause'
            },
            // 上下曲不可点击样式
            disableCls() {
                return this.songReady ? '' : 'disable'
            },
            // cd封面样式
            cdCls() {
                return this.isPlay ? 'play' : 'play pause'
            },
            ...mapGetters([
                'fullPlayer', // 是否全屏
                'playlist', // 播放列表
                'currentSong', // 当前播放歌曲
                'currentIndex', // 当前播放歌曲的索引
                'isPlay' // 播放状态
            ])
        },
        watch: {
            // 当歌曲改变的时候自动播放
            currentSong() {
                this.$nextTick(() => {
                    this.$refs.audio.play();
                });
            },
            // 监听播放状态
            isPlay(newPlaying) {
                const audio = this.$refs.audio;
                this.$nextTick(() => {
                    newPlaying ? audio.play() : audio.pause();
                });
            },
            currentTime(newTime) {
                if (newTime > 0) {
                    const percent = this.currentTime / this.currentSong.duration;
                    const barWidth = this.$refs.progressBar.clientWidth;
                    const offsetWidth = percent * barWidth;
                    this.$refs.progress.style.width = `${offsetWidth}px`;
                }
            }
        }
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
        transform-origin: 90% 80%;
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

            &.icon-like {
                color: $color-font-theme;
            }
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

                &.pause {
                    animation-play-state: paused;

                    .wave:nth-of-type(1) {
                        animation-play-state: paused;
                    }

                    .wave:nth-of-type(2) {
                        animation-play-state: paused;
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

            .bar-inner {
                position: relative;
                /*margin: 0 auto;*/
                margin-left: .2rem;
                margin-right: .2rem;
                width: 5rem;
                height: 2px;
                border-radius: 1px;
                background-color: $color-progress-background;


                .progress {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    border-radius: 1px;
                    background-color: $color-progress-background;
                }

                .progress-btn-wrap {
                    /*position: relative;*/
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 0;
                    height: 2px;
                    border-radius: 1px;
                    background-color: $color-font-theme;

                    .progress-btn {
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
                width: .6rem;
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

                &.disable {
                    color: $color-progress-background;
                }

                &.playBtn {
                    font-size: .9rem;
                }
            }
        }
    }

    .player-enter-active, .player-leave-active {
        transition: all .4s;
    }

    .player-enter, .player-leave-to {
        /*transform: translateX(100%);*/
        transform: scale(0);
    }

    .mini-wrap {
        z-index: 200;
        position: fixed;
        right: .3rem;
        bottom: 2rem;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: $color-background;
    }

    .mini-player {
        width: 100%;
        height: 100%;
        border: .04rem solid rgba(147, 112, 219, .5);
        border-radius: 50%;

        .mini-cover {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            @include bg-coverAndCenter();
        }

        &.play {
            animation: playerRotate 20s linear infinite;
        }

        // 动画暂停
        &.pause {
            animation-play-state: paused;
        }
    }

    .miniPlayer-enter-active, .miniPlayer-leave-active {
        transition: all 1s;
    }

    .miniPlayer-enter, .miniPlayer-leave-to {
        /*transform: translateX(100%);*/
        opacity: 0;
    }
</style>