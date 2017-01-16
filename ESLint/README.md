ESLint学习笔记
=========================
ESlint是一个插件化的JavaScript代码检测工具。用来避免低级语法错误，统一代码风格的工具。

优秀特性：
- 减少低级代码错误
- 统一代码风格
- 支持ES6
- 插件丰富

## 安装使用
#### 基本安装
ESlint 安装分为全局安装和项目[局部安装](http://eslint.org/docs/user-guide/getting-started)。我觉得这属于基础能力 ，所以应该全局安装，以减轻项目的配置负担。
```sh
npm install eslint -g
```
生成项目配置(已有`.eslintrc.*`文件可跳过)。配置也可以定义在`package.json`的`eslintConfig`一项中。
```sh
$ eslint --init
? How would you like to configure ESLint? Inspect your JavaScript file(s)
? Which file(s), path(s), or glob(s) should be examined? ./src/*.js
? What format do you want your config file to be in? JavaScript
? Are you using ECMAScript 6 features? Yes
? Are you using ES6 modules? Yes
? Where will your code run? Browser
? Do you use CommonJS? No
? Do you use JSX? No
Determining Config: 100% [=============================] 0.8s elapsed, eta 0.0s 


Enabled 223 out of 238 rules based on 1 file.
Successfully created .eslintrc.js file in /Users/yhostc/Wechat/yhostc-demo-admin
```

#### 基本使用
ESlint使用场景包含了命令行、构建工具、开发工具。初步尝试命令行：
```
// example.js
var result = [1, 2, 3, 4, 5, 6].map(row => row + 1);
console.log(result);
```
执行检查
```sh
eslint example.js
```
正常输出
```sh
/Users/yhostc/Wechat/yhostc-study-babel/example.js
  1:52  error  Extra semicolon                                semi
  2:20  error  Extra semicolon                                semi
  2:21  error  Newline required at end of file but not found  eol-last

✖ 3 problems (3 errors, 0 warnings)
```
命令行的其它[调用方式](http://eslint.org/docs/user-guide/command-line-interface)

#### 基本配置
通过`.eslintrc`文件，可以指定代码运行环境是node还是browser；有哪些全局变量，例如jQuery之类；支持的ECMAScript版本号等。其中，最重要的是规则配置，告诉eslint工具需要检查哪些语法规则，配置方式如下：
```
"rules": [
    "rule-name1": "0",
    "rule-name2": "1",
    "rule-name3": "2"
]
```
规则格式是"<规则名称>: <告警级别>"，告警级别分为三种:
- `off` or `0`: 关闭
- `warn` or `1`: 打开，警告时提示，代码检查继续。
- `error` or `2`: 打开，错误时提示，代码检查终止。


配置文件中常用的有如下四项:
- `environments` 环境变量
- `Globals` 全局变量
- `Rules` 规则
- `Plugins` 插件

[了解更多配置规则](http://eslint.cn/docs/user-guide/configuring)

## 应用集成
#### webpack
引入并配置好eslint和eslint-loader后，就可以开始添加webpack的相关配置了：
```js
preLoaders: [
    {
        test: /\.js$/,  // 检测所有的js文件
        loader: "eslint-loader", // 使用eslint插件
        exclude: [   // 排除第三方文件
            /node_modules/,
            /app\/lib/
        ]
    }
]

```
让webpack在打包文件之前，对除第三方外的js文件用eslint进行检查。

完成上述配置后，webpack在构建时就能自动对js代码用eslint进行检查了。

注：由于webpack在默认配置下遇到error并不会抛出错误终止代码打包，需要在webpack命令上添加bail参数让webpack抛出错误：
> webpack --bail --progress --colors --config webpack.config.js


#### sublime text



## 参考文章
- [eslint使用心得](https://yq.aliyun.com/articles/66559)
- [eslint简单介绍](http://newblog.tecclass.cn/page/EsLint-pei-zhi-jian-dan-zhi-nan?utm_source=tuicool&utm_medium=referral)
