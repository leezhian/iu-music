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

                <div class="lyric-wrapper">
                    <div class="current-lyric">
                        <p class="text"></p>
                    </div>
                </div>

                <div class="player-footer">
                    <div class="progressBar-box">
                        <div class="time">{{formatTime(currentTime)}}</div>

                        <div class="bar-inner" ref="progressBar" @click="progressClick">
                            <div class="progress" ref="progress">
                                <div class="progress-btn"
                                     ref="progressBtn"
                                     @touchstart.prevent="progressTouchStart"
                                     @touchmove.prevent="progressTouchMove"
                                     @touchend="progressTouchEnd"></div>
                            </div>
                        </div>

                        <div class="time">{{formatTime(currentSong.duration)}}</div>
                    </div>
                    <div class="tools">
                        <div :class="['btn', modeIcon]" @click="changeMode"></div>
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

        <audio :src="currentSong.link"
               ref="audio"
               @canplay="canReady"
               @error="error"
               @timeupdate="updateTime"
               @ended="end"></audio>
    </div>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex';
    import * as types from 'store/mutation-types';
    import {playMode} from 'static/js/config';
    import {randomIndex} from 'static/js/utils';

    import Lyric from 'lyric-parser';

    export default {
        created() {
            // 进度条数据
            this.touch = {}
        },
        data() {
            return {
                songReady: false, // 歌曲是否准备好播放
                currentTime: 0, // 当前音乐播放进度时间
                currentLyric: [] // 歌词
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

                // 判断是否播放列表中只有一首歌
                if (this.playlist.length == 1) {
                    this.loop();
                    return;
                }

                let index = this.currentIndex + 1;

                if (this.mode == playMode.random) {
                    index = randomIndex(0, this.playlist.length - 1);
                }

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

                // 判断是否播放列表中只有一首歌
                if (this.playlist.length == 1) {
                    this.loop();
                    return;
                }

                let index = this.currentIndex - 1;

                if (this.mode == playMode.random) {
                    index = randomIndex(0, this.playlist.length - 1);
                }

                if (index < 0) {
                    index = this.playlist.length - 1;
                }
                this.setCurrentIndex(index);
                this.songReady = false;
            },
            // 切换模式
            changeMode() {
                const mode = (this.mode + 1) % 3;
                this.setPlayMode(mode);
            },
            // 当音乐准备好会自动触发
            canReady(e) {
                this.songReady = true;
                // console.log(this.$refs.audio.duration);
            },
            // 音乐播放完自动触发
            end() {
                if (this.mode === playMode.single || this.playlist.length == 1) {
                    this.loop();
                } else {
                    this.next();
                }
            },
            // 循环
            loop() {
                this.$refs.audio.currentTime = 0;
                this.$refs.audio.play();
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
            // 拖动开始
            progressTouchStart(e) {
                this.touch.initiated = true; // 是否初始化
                this.touch.startX = e.touches[0].pageX; // 点击时的横坐标
                this.touch.left = this.$refs.progress.clientWidth; // 当前进度条的长度
            },
            // 拖动时
            progressTouchMove(e) {
                if (!this.touch.initiated) {
                    return;
                }
                const deltaX = e.touches[0].pageX - this.touch.startX; // 算出手指的偏移量
                const offsetWidth = Math.min(this.$refs.progressBar.clientWidth, Math.max(0, this.touch.left + deltaX));
                this._setProgress(offsetWidth);
            },
            // 拖动结束时
            progressTouchEnd(e) {
                this.touch.initiated = false;
                const barWidth = this.$refs.progressBar.clientWidth;
                const percent = this.$refs.progress.clientWidth / barWidth;
                this.$refs.audio.currentTime = this.currentSong.duration * percent; // 修改播放进度
                if (!this.isPlay) {
                    this.togglePlay();
                }
            },
            // 点击进度条的时候
            progressClick(e) {
                const rect = this.$refs.progressBar.getBoundingClientRect();
                const offsetWidth = e.pageX - rect.left;
                this._setProgress(offsetWidth);
                const barWidth = this.$refs.progressBar.clientWidth;
                const percent = this.$refs.progress.clientWidth / barWidth;
                this.$refs.audio.currentTime = this.currentSong.duration * percent;
            },
            // 解析歌词
            async getLyric() {
                if (!this.currentSong.lyric) {
                    await this.setCurrentLyric({id: this.currentSong.id});
                }
                this.currentLyric = new Lyric(this.currentSong.lyric);
                console.log(this.currentLyric);
            },
            // 设置进度条长度
            _setProgress(offsetWidth) {
                this.$refs.progress.style.width = `${offsetWidth}px`;
            },
            ...mapActions({
                setCurrentLyric: 'setLyric'
            }),
            ...mapMutations({
                setFullScreen: types.SET_FULL_SCREEN,
                updatePlayState: types.UPDATE_PLAY_STATE,
                setCurrentIndex: types.SET_CURRENT_INDEX,
                setPlayMode: types.SET_PLAY_MODE
            })
        },
        computed: {
            // 播放图标修改
            playIcon() {
                return this.isPlay ? 'icon-play' : 'icon-pause'
            },
            modeIcon() {
                const modeCls = ['icon-loop', 'icon-single', 'icon-random'];
                return this.mode > modeCls.length ? '' : modeCls[this.mode];
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
                'isPlay', // 播放状态
                'mode', // 模式
            ])
        },
        watch: {
            // 当歌曲改变的时候自动播放
            currentSong() {
                this.$nextTick(() => {
                    this.$refs.audio.play();
                    this.getLyric();
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
                if (newTime > 0 && !this.touch.initiated) {
                    // 求出比值
                    const percent = this.currentTime / this.currentSong.duration;
                    // 获取进度条总长
                    const barWidth = this.$refs.progressBar.clientWidth;
                    const offsetWidth = percent * barWidth;
                    this._setProgress(offsetWidth);
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
                @include no-wrap;
            }

            .singer {
                @include no-wrap;
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
                    /*position: relative;*/
                    position: relative;
                    /*top: 0;*/
                    /*left: 0;*/
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