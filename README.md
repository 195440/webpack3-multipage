# webpack3+ 笔记

基于webpack的前端工程化开发多页面

本文仅作为webpack入门学习交流，不作为实际项目参考

---

### webpack是什么

webpack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Sass，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。在3.0出现后，Webpack还肩负起了优化项目的责任。

<img src="https://github.com/195440/webpack3-multipage/blob/master/webpack.png">

### 初始化项目、安装依赖 (下载本项目并进入到目录)

    npm install --save

如果安装失败，可能有三种原因：

+ node版本过低，你可以通过node -v查看版本信息；
+ 网络比较慢，由于npm安装比较慢，你可以通过cnpm或者科学上网，进行安装；

    #安装cnpm

    npm install -g cnpm --registry=https://registry.npm.taobao.org

+ 如果你使用的是Linux或者Mac，可能是权限问题，请使用sudo；

### 开发模式运行

    npm run start

### 生成模式打包

    npm run build


### 主要目录结构

```
- webpack3-multipage-master
  - src                #代码开发目录
    - common              #共通引用
      + css                  
      + data
      + img
      + js
    - view             #模板
      - index          #页面一
          index.html   
          index.js
          style.css
      - index2         #页面二
          index2.js 
  - dist               #webpack编译打包输出目录，无需建立目录可由webpack根据配置自动生成
    + assets                
      index.html
      index.html
  + node_modules       #所使用的nodejs模块
  package.json         #项目配置
  package-lock.json    #初始化自动生成文件
  webpack.common.js    #webpack共通配置
  webpack.dev.js       #webpack开发模式配置
  webpack.prod.js      #webpack生成模式打包配置  
  README.md            #项目说明
```

### webpack.common.js 共通配置

```javascript
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 用于修正打包index.html引用更新
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 用于提取单独的css文件
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 用于清理dist文件夹

module.exports = {
  // 入口文件
  entry: {
    index: './src/view/index/index.js',
    index2: './src/view/index2/index2.js',
    print: './src/common/js/print.js'
  },
  // 输出文件及路径
  output: {
    filename: 'assets/[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // 模块
  module: {
    rules: [{ // js babel编译
      test: /\.js|jsx$/,
      use: [
        'babel-loader'
      ]
    }, { // 加载 CSS
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    }, { // 加载图片
      test: /\.(png|svg|jpg|gif)$/,
      use: [ 
         // 通过 name 字段来指定图片打包的目录与文件名
        'file-loader?lname=assets/[hash:8].[name].[ext]'
      ]
    }, { // 加载字体
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [
        'file-loader'
      ]
    }, { // 加载数据
      test: /\.(csv|tsv)$/,
      use: [
        'csv-loader'
      ]
    }, { // 加载数据
      test: /\.xml$/,
      use: [
        'xml-loader'
      ]
    }]
  },
  plugins: [
    new ExtractTextPlugin('assets/[name].css'), //单独使用link标签加载css并设置路径，相对于output配置中的publickPath
    // 多个HtmlWebpackPlugin则生成多个html
    new HtmlWebpackPlugin({ // 根据模板插入css/js等生成最终HTML
      // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
      template: './src/view/index/index.html', // html模板路径
      inject: 'body', // js插入的位置，true/'head'/'body'/false
      hash: true, //为静态资源生成hash值
      chunks: ['common', 'index', 'print'], // 需要引入的chunk，不配置就会引入所有页面的资源
      minify: { //压缩HTML文件  
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: false //删除空白符与换行符
      }
    }),
    new HtmlWebpackPlugin({ // 根据模板插入css/js等生成最终HTML
      // favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
      filename: './index2.html', // 生成的html存放路径，相对于path
      inject: 'body', // js插入的位置，true/'head'/'body'/false
      hash: true, //为静态资源生成hash值
      chunks: ['common', 'index2', 'print'], // 需要引入的chunk，不配置就会引入所有页面的资源
      minify: { //压缩HTML文件  
        removeComments: true, //移除HTML中的注释
    　  collapseWhitespace: false //删除空白符与换行符
      }
    }),
    new CleanWebpackPlugin(['dist']), // 用于清理dist文件夹
    new webpack.optimize.CommonsChunkPlugin({ // 提取共通去重
      name: 'common' // 指定公共 bundle 的名称。
    }),
    new webpack.ProvidePlugin({ // 加载插件配置
      _: 'lodash'
    }),
  ],
};
```

### webpack.dev.js 开发模式配置

```javascript
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'source-map', // 开启代码地图
  devServer: {
    contentBase: './',
    host:'localhost', // 服务地址
    port: 9090, // 端口
  }
});
```

### webpack.prod.js 生成模式打包配置

```javascript
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
```
