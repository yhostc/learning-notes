Webpack入门学习笔记
===========================

![image](https://webpack.js.org/15998c6f72bff817a85028b881f75163.svg)

## WebPack存在意义及优势

#### 存在意义
如何在一个大规模的代码库中，维护各种模块资源的分割和存放，维护它们之间的依赖关系，并且无缝的将它们整合到一起生成适合浏览器端请求加载的静态资源。

#### 竞品对比
+ 传统script标签插入（人工维护顺序、逻辑、关系）
- CommonJS（阻塞加载、不可并行）
- AMD（阅读、开发困难、语音不顺、不通用）
- CMD（依赖SPM，模块加载逻辑偏重）
- ES6（缺乏标准普及）

#### 模块化目标
- 将依赖树拆分成按需加载的块
- 初始化加载的耗时尽量少
- 各种静态资源都可以视作模块
- 将第三方库整合成模块的能力
- 可以自定义打包逻辑的能力
- 适合大项目，无论是单页还是多页的 Web 应用

[更多模块化的观点](https://github.com/seajs/seajs/issues/547)

#### webpack的优势
代码拆分、Loader、智能解析、插件系统、快速运行


## 安装使用
#### 安装
```sh
# 全局安装webpack
npm install webpack -g

# 命令安装确认
webpack -h

# 安装到当前项目
npm install webpack --save-dev

# 开发工具安装
npm install webpack-dev-server --save-dev
```

#### 基本使用
1. 构建index.html
```html
<html>
  <head>
    <title>Webpack 2 demo</title>
  </head>
  <body>
    <script src="bundle.js"></script>
  </body>
</html>
```
2. 构建entry.js
```node
document.write("it works");
document.write(require("./module.js"));
```
3. 构建module.js
```node
module.exports  = 'It works from module.js.';
```
4. 打包
```node
webpack entry.js bundle.js
```
5. 测试
```sh
# 安装webpack-dev-server
npm install webpack-dev-server -g
```
6. 访问
http://localhost:8080/webpack-dev-server/

#### Loader
由于webpack只能处理javascript模块，因此Loader可以被称为模块和资源转换器

1. Loader优势
- 链式管道调用
- 同步或异步执行
- 在node.js中运行,npm发布
- 可以接受参数
- 可以通过文件名绑定给不同文件(正则)
- 本身可以导出为一个Loader
- 支持插件

2、Loader的命名
loader 一般以 xxx-loader 的方式命名，xxx 代表了这个 loader 要做的转换功能，比如 json-loader

命名搜索顺序:
```node
Default: ["*-webpack-loader", "*-web-loader", "*-loader", "*"]
```
3、使用示例:
新增style.css
```css
body { background: yellow; }
```
修改 entry.js,在开头增加
```node
require("!style!css!./style.css") // 载入 style.css
```

安装loader
```sh
npm install css-loader style-loader --save-dev
```

打包
```node
webpack entry.js bundle.js --module-bind "css=style!css"
```
#### 配置文件
修改style.css
```css
body { background: blue; }
```
修改entry.js中样式引用方式
```js
require('./style.css');
```
增加webpack.config.js
```js
var webpack = require('webpack')

module.exports = {
  entry: './entry.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'}
    ]
  }
}
```
打包测试
```sh
# 打包
webpack
# 测试
webpack-dev-server --progress --colors
```

更多配置 [参考1](https://zhuanlan.zhihu.com/p/21346555)
[参考2](http://blog.csdn.net/keliyxyz/article/details/51527476)

## 插件
插件的作用是完成loader不可以完成的任务。webpack本身内置了一些常用的插件，以BannerPlugin为例,在webpack.config.js中module之后增加:
```js
plugins: [
	new webpack.BannerPlugin('create banner plugins by nan.zh')
]
```
运行
```sh
webpack
```
检查bundle.js第一行已出现上述注释

[更多插件](https://webpack.js.org/plugins) 

## 开发环境 
编译过程视觉增强
```sh
webpack --progress --colors
```

监听编辑
```sh
webpack --progress --colors --watch
```

安装webpack-dev-server
```sh
# 安装
npm install webpack-dev-server -g
# 运行
webpack-dev-server --progress --colors
```

故障处理
#### 打印错误
```sh
webpack --display-error-details
```

#### 模块解析细节
Webpack 的配置提供了 resolve 和 resolveLoader 参数来设置模块解析的处理细节，resolve 用来配置应用层的模块（要被打包的模块）解析，resolveLoader 用来配置 loader 模块的解析。

#### 路径
Webpack 中涉及路径配置最好使用绝对路径，建议通过 path.resolve(__dirname, "app/folder") 或 path.join(__dirname, "app", "folder") 的方式来配置，以兼容 Windows 环境。


高级部分
===================
## Resolve
#### 别名Alias

