Babel读书笔记
=========================
Babel是一个编译器，它可以将代码从ES6转移为ES5代码。[官方](https://babeljs.io/)定义为下一代JavaScript库，在ES6尚未完全得到支持的情况下，可提前使用ES6的新特性，而不用担心不被支持的情况。

![image](http://static.open-open.com/lib/uploadImg/20160126/20160126090317_448.png)

本文为个人学习笔记，主线为介绍和基本使用babel，需要深入了解的内容提供了可供深入阅读的链接。


## 开发工具
工欲善其事必先利其器，以Sublime Text 3为例, 安装`babel`插件以支持语法高亮。其它工具请[参看官网](https://babeljs.io/docs/editors)


## 安装使用
从脉络来看，官方提供了一系列使用Babel的转码方式，其中穿插介绍了如何通过polyfill技术来弥补不足，以及`.babelrc`配置文件的定义方式。

1. `babel-cli` 提供CLI方式转码
2. `babel-node` 提供node REPL方式转码
2. `babel-register` 提供require钩子函数方式转码
3. `babel-core`，提供在源码中操作转码.
2. [在线方式](https://babeljs.io/repl/)


#### CLI安装
CLI是Babel提供给我们通过命令行调用的方式，可以进行文件的编译、使用插件和文件导出等操作，使用起来比较简单。

Babel在开发环节，为了使用方便我们可以采用全局安装。但是上线环节建议采用项目内安装方式，以避免对运维环境的隐式依赖。
```sh
# 全局安装
$ npm install babel-cli -g
# 项目安装
$ npm install --save-dev babel-cli
# 编译文件
$ babel script.js //该方式也可写入npm script中
```
更多Options参数，参见[官网](http://babeljs.io/docs/usage/cli/)
```sh
$ bebel --help
```

#### babel-node
CLI自带了另一个类似Node.js CLI的工具。它支持node 的REPL环境，可以直接运行ES6代码,因为是实时转码，所以效率有一定的降低，不建议在生产环境使用。
```node
$ babel-node
> [1,2,3,4,5,6].map(x=>x*2);
[ 2, 4, 6, 8, 10, 12 ]
```
定义示例文件 example.js
```js
console.log([1, 2, 3, 4, 5, 6].map(row => row + 1));
```
```node
$ babel-node example.js
```

更多Options参数,参见[官网](http://babeljs.io/docs/usage/cli/)。

#### 配置
Babel的配置文件为根目录的.babelrc。Babel允许除了callback之外的所有API options参数出现在配置文件中，但是常用的只有预设presets和插件plugins，该配置文件为下述转码提供了基本准则。
```json
{
  "presets": [],
  "plugins": []
}
```
预设（presets）是一组插件的集合，官方提供了一些常用的预设，省却自己的组装之苦。
```sh
// ES2015 转码规则
$ npm install --save-dev babel-preset-es2015

# ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
$ npm install --save-dev babel-preset-stage-0   // 展示阶段
$ npm install --save-dev babel-preset-stage-1   // 征求意见阶段
$ npm install --save-dev babel-preset-stage-2   // 草案阶段
$ npm install --save-dev babel-preset-stage-3   // 候选人阶段
```

另外，babel的配置还可以被添加到package.json中，有兴趣可以查看官网[配置说明](http://babeljs.io/docs/usage/babelrc/)。

写个小demo练练手, 创建example.js
```js
[1,2,3,4,5,6].map(row=>row+1);
```
运行CLI命令，发现代码已被转译为ES5.
```sh
$ babel example.js
```

#### Polyfill*
由于Babel只转换新的语法(如箭头函数)，对于新增的API默认是不转化的。因此，当我们被转移的代码运行在不支持这些API的环境时(如IE)，可能就会报错。因此Babel建议我们采用Polyfill技术来修补这个不足。

[`polyfill`](https://remysharp.com/2010/10/08/what-is-a-polyfill)(它使用了[`core-js`](https://github.com/zloirock/core-js)和[`regenerator`](https://facebook.github.io/regenerator/))从原理上来讲，就是判断环境是否已经支持该API，如果支持就不做干涉，如果不支持就代为实现。如果想了解更多，[这份资料](http://blog.csdn.net/wang16510/article/details/8960312)会比较详细的做出介绍。

我们练练手，创建polyfill.js
```js
function addAll() {
  return Array.from(arguments).reduce((a, b) => a + b);
}
```
转译
```sh
$ babel polyfill.js
```
转译输出为
```js
"use strict";

function addAll() {
  return Array.from(arguments).reduce(function (a, b) {
    return a + b;
  });
}
```
如果上述被转译的代码运行在IE9以下浏览器可能就会遭遇不支持Array.from的情况，所以我们安装`polyfill`来解决它
```sh
$ npm install --save-dev babel-polyfill
```
在polyfill.js头部增加引用
```js
import "babel-polyfill";
```
转译代码后得到
```js
"use strict";

require("babel-polyfill");

function addAll() {
	return Array.from(arguments).reduce(function (a, b) {
		return a + b;
	});
}
```
由于Babel编译时默认使用的是CommonJS的模块规范，因此import会被替换为require。上述代码运行在node时不会有问题，但是运行在IE9以下浏览器可能会遭遇不测。

所以我们需要将require引用方式替代为script的引用方式。
```html
<script src="node_modules/babel-polyfill/dist/polyfill.min.js"></script>
```
这样的引用方式可能不是一种比较好的模块引用方式，如果想了解更好方式可参看另一篇同为[Babel入门](http://hao.jser.com/archive/11432/)的文章。



#### Babel-register
babel-register是babel提供的另一种代码转换方式，原理是使用钩子函数重写了node.js的require。在使用require调用扩展名为`.es6`，`.es`，`.jsx`和`.js`的节点所需的所有后续文件都将被Babel转码。
```sh
$ npm install babel-register --save-dev
```
它的作用用代码说明可能比较容易理解:
```js
// index.js
console.log('Hello World!');
```
```js
// register.js
require("babel-register");
require("./index.js");
```
```sh
$ node register.js
```
更多参数请参看[官网](http://babeljs.io/docs/core-packages/babel-register/)。

同`babel-node`一样，`babel-register`同样为实时转码，因此效率没有预编译高，不建议在生产环境使用。

#### Babel-core
babel-core也是代码转换工具，使用场景是在源码中使用。因此提供了一系列transform方法,可以转换代码，转换代码文件，转换AST。这里所有的transform方法均会使用到本地的配置文件(.babelrc 或 in package.json)
```js
// example3.js
var babel = require("babel-core");

var result = babel.transform("code();", options); // => { code, map, ast }
console.log(result);
```
```sh
$ babel-node example3.js
```
更多[`transform`](http://babeljs.io/docs/core-packages/)方法、[`Options`](http://babeljs.io/docs/core-packages/)请参看官网


## Webpack集成
```js
module: {
  loaders:  [
    {
      test: /\.js/,
      loader: 'babel?presets[]=es2015,presets[]=react,plugins[]=transform-runtime'
    }
  ]
}
```





## 参考文章
1. [Babel官网](http://babeljs.io/)
2. [Babel 入门教程](http://www.ruanyifeng.com/blog/2016/01/babel.html)
3. [为何要用Polyfill](http://blog.csdn.net/github_26672553/article/details/52138298)
4. [Babel快速入门](http://hao.jser.com/archive/11432/)
5. [简单实用Babel](http://www.tuicool.com/articles/Rbm6Rj6)
