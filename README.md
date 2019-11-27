> iu-music 服务端 https://github.com/kami232/iu-music-server

# 设计

界面主要参考QQ音乐、网页云音乐。

# 使用技术
1. webpack
2. vue + vue-router + vuex + vue-lazyload
3. axios
4. lodash库
5. better-scroll

# 运行

CMD进入项目根路径，执行 `npm i`，安装依赖。

然后执行`npm run build-dll` 将 vue 和 lodash库 单独打包成一个文件。（执行一次就行了，下次就不用了）
1. 开发环境：`npm run dev`
访问地址：http://localhost:3000
如果想要在内网可以访问，则把**build/webpack.dev.js**下的`host: 0.0.0.0`注释解开

2. 生产环境：`npm run build`
目前还存在bug，后期修复。
