# webpack3+ 学习笔记 #

## 基于webpack的前端工程化开发多页面

**本文仅作为webpack入门学习交流，不作为实际项目参考**

---

## webpack是什么 ##

webpack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Sass，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。在3.0出现后，Webpack还肩负起了优化项目的责任。

<img src="https://github.com/195440/webpack3-multipage/blob/master/webpack.png">

### 初始化项目、安装依赖 (下载本项目并进入到目录)

    npm install --save

如果安装失败，可能有三种原因：

+ node版本过低，你可以通过node -v查看版本信息；
+ 网络比较慢，由于npm安装比较慢，你可以通过cnpm或者科学上网，进行安装；
+ 如果你使用的是Linux或者Mac，可能是权限问题，请使用sudo；

### 开发模式运行

    npm run start

### 生成模式打包

    npm run build


#### 主要目录结构

```
- webpack3-multipage-master
  - src                #代码开发目录
    - common              #共通引用
      + css
      + data
      + img
      + js
    - view
      - index
          index.html
          index.js
          style.css
      - index2 
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
