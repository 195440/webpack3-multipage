const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'source-map', // 开启代码地图
  devServer: {
    contentBase: './',
    port: 9090, //默认8080
  }
});