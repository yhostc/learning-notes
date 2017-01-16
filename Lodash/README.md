Lodash学习笔记
======================
一个接口一致化、模块化、高性能等特性的JavaScript工具库

[官网文档](http://lodashjs.com/docs/)

## 基本使用
#### 模块格式
- [Npm package](https://www.npmjs.com/package/lodash)格式
```html
<script src="lodash.js"></script>
```
- [AMD modules](https://github.com/lodash/lodash/tree/3.10.1-amd)格式
```js
require(['lodash'], function(_) {});
```
- [ES modules](https://github.com/lodash/lodash/tree/3.10.1-es)格式
```sh
$ {sudo -H} npm i -g npm
$ npm i --save lodash
```
```js
// 也可直接加载库
var _ = require('lodash');
// 或方法分类
var array = require('lodash/array');
// 或具体方法
var chunk = require('lodash/array/chunk');
```

## 函数参考
该工具库共有13个方法分类

#### Array
#### Chain
#### Coolection
#### Date
#### Function
#### Lang
#### Math
#### Number
#### Object
#### String
#### Utility
#### Methods
#### Properties
