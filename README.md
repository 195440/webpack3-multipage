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
        // loader 后面 limit 字段代表图片打包限制，这个限制并不是说超过了就不能打包，而是指当图片大小小于限制时会自动转成 base64 码引用。上例中大于8192字节的图片正常打包，小于8192字节的图片以 base64 的方式引用。
        // url-loader 后面除了 limit 字段，还可以通过 name 字段来指定图片打包的目录与文件名
        'file-loader?limit=8192&name=assets/[hash:8].[name].[ext]'
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
      // minify: { //压缩HTML文件  
      //   removeComments: true, //移除HTML中的注释
      //   collapseWhitespace: false //删除空白符与换行符
      // }
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
    new webpack.ProvidePlugin({　// 加载插件配置
      _: 'lodash'
    }),
  ],
};
