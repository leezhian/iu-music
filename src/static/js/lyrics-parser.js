// '\['                 转义方括号
// '\d{2,}'             0-9任意数字重复至少两次，分别匹配分钟和整数秒
// (?:\.(\d{2,3}))?     小括号里的一坨，也就是毫秒，可能有，也可能没有
// ']'                  匹配括号，很奇怪这个括号竟然不需要转义，奇葩！我也是测试后才知道的
const timeExp = /\[(\d{2,}):(\d{2,3})(?:\.(\d{2,3}))?]/g;
// 播放状态常量
const STATE_PAUSE = 0;
const STATE_PLAYING = 1;

// 重新定义了更加语义化的标签名
const tagRegMap = {
    title: 'ti',
    artist: 'ar',
    album: 'al',
    offset: 'offset',
    by: 'by'
};

function noop() {
}

// 输出 Lyric 类
export default class Lyric {
    constructor(lrc, handler = noop) {
        this.lrc = lrc;
        this.tags = {};
        this.lines = [];
        this.handler = handler;
        this.state = STATE_PAUSE;
        this.curLine = 0;

        this._init()
    }

    _init() {
        this._initTag();

        this._initLines();
    }

    _initTag() {
        for (let tag in tagRegMap) {
            // 匹配出歌词的标签属性
            const matchs = this.lrc.match(new RegExp(`\\[${tagRegMap[tag]}:([^\\]]*)`, 'i'));
            // 填充进 tags 对象
            this.tags[tag] = matchs && matchs[1] || '';
        }
    }

    _initLines() {
        // 通过换行符，拆解歌词
        const lines = this.lrc.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            // 匹配时间戳
            let result = timeExp.exec(line);
            if (result) {
                // 去掉时间，只留下文字部分
                const txt = line.replace(timeExp, '').trim();
                if (txt) {
                    // 将符合格式的歌词和时间转换后推进列表
                    this.lines.push({
                        time: result[1] * 60 * 1000 + result[2] * 1000 + (result[3] || 0) * 10,
                        txt
                    })
                }
            }
        }

        // 按歌词的时间顺序重新排了一遍
        // 好像本来解析出来顺序就是对的，大概是为了以防万一吧
        this.lines.sort((a, b) => {
            return a.time - b.time;
        })
    }

    // 通过时间，找到当前歌词的位置
    _findCurNum(time) {
        for (let i = 0; i < this.lines.length; i++) {
            if (time <= this.lines[i].time) {
                return i;
            }
        }
        return this.lines.length - 1;
    }

    // 调用处理函数，并将当前歌词和行数传入
    _callHandler(i) {
        if (i < 0) {
            return
        }
        this.handler({
            txt: this.lines[i].txt,
            lineNum: i
        })
    }

    // 持续输出当前的歌词位置
    _playRest() {
        let line = this.lines[this.curNum];
        // 根据歌词中带有的时间信息，计算出下一次歌词变更的时间间隔
        let delay = line.time - (+new Date() - this.startStamp);

        this.timer = setTimeout(() => {
            this._callHandler(this.curNum++);
            if (this.curNum < this.lines.length && this.state === STATE_PLAYING) {
                // 只要处于播放状态中，重复调用这个函数
                this._playRest();
            }
        }, delay);
    }

    // 暴露在类库外部调用的功能函数
    // 歌词播放
    play(startTime = 0, skipLast) {
        if (!this.lines.length) {
            return
        }
        // 修改播放状态
        this.state = STATE_PLAYING;
        // 记录下播放开始瞬间的歌词当前值和时间戳
        this.curNum = this._findCurNum(startTime);
        this.startStamp = +new Date() - startTime;

        if (!skipLast) {
            this._callHandler(this.curNum - 1)
        }

        if (this.curNum < this.lines.length) {
            clearTimeout(this.timer);
            this._playRest()
        }
    }

    // 切换播放状态
    togglePlay() {
        var now = +new Date();
        if (this.state === STATE_PLAYING) {
            this.stop();
            // 记录下暂停的时间戳
            this.pauseStamp = now;
        } else {
            this.state = STATE_PLAYING;
            // 如果是第一次播放，传入 0
            // 如果是从暂停处播放，就传入已经播放完的进度时间
            this.play((this.pauseStamp || now) - (this.startStamp || now), true);
        }
    }

    // 停止播放
    stop() {
        this.state = STATE_PAUSE;
        clearTimeout(this.timer)
    }

    // 在指定位置开始播放
    seek(offset) {
        this.play(offset);
    }
}