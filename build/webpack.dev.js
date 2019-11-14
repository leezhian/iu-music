/**
 * webpack 开发环境下配置
 */
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpack = require('webpack');

const devConfig = module.exports = {
    devServer: {
        open: true,
        contentBase: './dist',
        port: 3000,
        hot: true,
        historyApiFallback: true,
        proxy: {
            // 'react/api': { // 当访问含有该目录的路径时，代理去请求target下的该路径
            //     target: '网址',
            //     secure: false, // 当target是https协议的时候需要配置
            //     pathRewrite: { // 配置临时接口，比如当访问header其实转去取demo的数据
            //         'header.json': 'demo.json'
            //     },
            //     changeOrigin: true
            // }
        },
        // host: '0.0.0.0'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = merge(baseConfig, devConfig);