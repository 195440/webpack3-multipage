const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'source-map', // 开启代码地图建议开启
  plugins: [ // 代码压缩
    new UglifyJSPlugin({
      sourceMap: true
    })
  ]
});