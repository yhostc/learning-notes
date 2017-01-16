Sass学习笔记
=======================
从本质上来讲，Sass并非一门程序语言，仅仅只是可以控制页面样式。对于程序员来讲需要一种可以使用变量、条件语句等编程特性的语言，因此Sass这样的预编译器便存在和产生了。

![image](http://image.beekka.com/blog/201206/bg2012061902.png)
Sass优秀特性：
- 兼容所有CSS版本的语法
- 功能丰富，领先其它同等产品
- 核心团队9年匠心研发。
- 业界首选CSS扩展语言。
- 社区完善。
- 辅助工具多。


## Sass是什么？
SASS是一种CSS的开发工具，提供了许多便利的写法，大大节省了设计者的时间，使得CSS的开发，变得简单和可维护。

## 安装使用
#### 安装
sass安装是通过ruby的gem包管理器
```sh
brew install ruby
gem install "sass"
sass -v 

// Sass 3.4.23 (Selective Steve)
```
目前稳定版本是`3.4.23`

#### 使用
sass文件后缀分两种，一种是`.sass`，不使用大括号和分好；另一种是我们常用的`.scss`，使用大括号和分号。相比简单，我更喜欢清晰，因此下文都已`.scss`文件为主。

我们以一个最简单的例子开始，先不用管内容，当然本身也很简单，一看即会。
```css
// example.scss
$blue : #1875e7;　
div {
　color : $blue;
}
```
下面，我们编译这个示例
1. 编译直接输出结果.
```sh
sass example.scss
```
编译结果为:
```css
@charset "UTF-8";
　
div {
  　color: #1875e7; 
}
```
2. 编译结果到`.css`文件
```css
sass example.scss compiled.css
```
3. 控制编译风格
- nested：嵌套缩进的css代码，它是默认值。
- expanded：没有缩进的、扩展的css代码。
- compact：简洁格式的css代码。
- compressed：压缩后的css代码, 常用于生产环境。
```css
scss --style compressed example.scss compiled.css
```
4. 监听文件变动
```css
// watch a file
sass --watch example.scss:compiled.css

// watch a directory
sass --watch input-scss:output-css
```
5.[在线转换器](http://sass-lang.com/try.html)

## 基础教程
#### 变量
sass允许以`$`开头的变量,上面的例子便是一个比较基本的变量使用样例。
```css
// example.scss
$blue : #1875e7;　
div {
　color : $blue;
}
```
如果变量要嵌套在字符串中使用，就需要`#{}`括起来
```css
$side : left;
.rounded {
　border-#{$side}-radius: 5px;
}
```
#### 计算
sass允许计算的存在
```css
body {
　margin: (14px/2);
　top: 50px + 100px;
　right: $var * 10%;
}
```
#### 嵌套
如下,div和h1实现了选择器的嵌套，border和color实现了属性的嵌套(border后面必须跟上冒号)
```css
div {
　h1 {
　　color:red;
　}
　p {
　  border:{
      color: red;
    }
　}
}

```
在嵌套代码块中，可以使用`&`引用父元素
```css
a {
  &:hover { color:ffb3ff; }
}
```
子组合选择器和同层组合选择器`>`,`+`,`~`
```css
// 命中article下所有section
article section { margin: 5px }
// 命中article下直接层级section
article > section { border: 1px solid #ccc }
// 命中header后紧跟的p
header + p { font-size: 1.1em }
// 命中nav后所有同层的article
nav ~ article { border-top: 1px dashed #ccc }
```


#### 注释
sass共有两种注释风格。
1. 标准CSS注释`/* note */`，编译后会保留。`/*! note */`表示重要注释，即使压缩模式也依然会被保留。
2. 单行注释`//note`，编译后会省略掉。
```
## 代码重用
#### 继承
SASS允许一个选择器，继承另一个选择器。比如，现有class1：
```css
.class1 {
  border: 1px solid #ddd;
}

.class2 {
  @extend .class1;
  font-size:120%;
}
```
编译结果:
```css
.class1, .class2 {
  border: 1px solid #ddd; 
}

.class2 {
  font-size: 120%; 
}
```
#### 混合Mixin
mixin是定义一个名叫`left`代码块，并实现重用
```css
@mixin left {
　float: left;
　margin-left: 10px;
}
div {
  @include left;
}
```
还可以传参
```css
@mixin left($value: 10px) {
　float: left;
　margin-right: $value;
}

div {
  @include left(20px);
}
```
#### 颜色
SASS提供了一些内置的颜色函数，以便生成系列颜色。
```css
lighten(#cc3, 10%) // #d6d65c
darken(#cc3, 10%) // #a3a329
grayscale(#cc3) // #808080
complement(#cc3) // #33c
```
更多颜色，[请点这里](https://github.com/sass/sass/blob/stable/lib/sass/script/value/color.rb#L28-L180)

#### 插入文件
@import命令，用来插入外部文件。
```css
// 插入scss
@import "path/filename.scss";

// 插入css
@import "foo.css";
```


## 高级用法
#### 条件
`@if`和`@else`可以用来判断：
```css
@if lightness($color) > 30% {
  background-color: #000;
} @else {
  background-color: #fff;
}
```

#### 循环
`@for`循环
```css
@for $i from 1 to 10 {
　.border-#{$i} {
　  border: #{$i}px solid blue;
　}
}
```
`@while`循环
```css
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
```
`@each`循环
```css
@each $member in a, b, c, d {
  .#{$member} {
     background-image: url("/image/#{$member}.jpg");
  }
}
```

#### 自定义函数
```css
@function double($n) {
   @return $n * 2;
}

#sidebar {
   width: double(5px);
}
```

## 参考资料
- [SASS官网](http://sass-lang.com/)
- [SASS中文网](http://www.sasschina.com/)
- [阮一峰播客](http://www.ruanyifeng.com/blog/2012/06/sass.html)
