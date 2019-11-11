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
        host: '0.0.0.0'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};

module.exports = merge(baseConfig, devConfig);