# Zonda

[![Build Status](https://travis-ci.org/smallsmallwolf/Zonda.png?branch=master)](https://travis-ci.org/smallsmallwolf/Zonda)

基本重构完成。重新写文档，写测试中...

- - -

Zonda——Degas自家用的前端框架。

感谢和我一起建造Zonda的朋友们，亲爱的[Niko](http://niko-blog.com/)，[leohgbs](https://github.com/leohgbs)，[bronze1man](http://bs.ikm.me/)。

BUG还很多，发现一个修复一个。已在几个项目中使用，不断更新，不断学习~

## Zonda行车手册

### 开发环境依赖
- - -
- Linux/Unix/Mac OS X **No Windows at all**
- NodeJs v0.10.13
- SPM v2.1.9
- CoffeeScript v1.6.3
- Less v1.4.2
- Grunt v0.4.1+


### 点火，起步！
- - -

`git clone https://github.com/smallsmallwolf/Zonda.git` 将Zonda拉到Web服务的文件根目录(Web服务器`/`的位置，放到这里主要是为了方便)，然后执行：

```shell
cd Zonda/
npm install
```

执行完毕后，Zonda会根据`Zonda/project-template`创建一个前端项目模板，目录结构大致是这样的：

```coffeescript
assets/ # 前端项目根目录

  etc/ # 项目配置文件  
    zonda.yml # Zonda 全局配置

  vendor/ # 第三方组件
    Zonda/ # Zonda 源码

  src/ # 你的应用程序源代码 

  ui/ # 你的应用程序的UI文件
    less/
      app.less
      mixin.less
      responsive.less
      ...
    images/
    vendor/
    ie/
      ie.css      

  test/ # 测试你的应用程序
    zonda.html # 框架测试HTML
    app.html # 应用测试HTML
    qunit/ # Qunit 的必要文件
      qunit.js
      qunit.css
    case/ # 你的应用程序的测试用例
      app/
      zonda/ # 框架测试代码

  dist/ # 编译产生的各种文件
    dist-dev.css
    framework-dev.js
    app-dev.js   

  tool/ # Zonda Tool
  Gruntfile.coffee # Grunt 配置，用于测试你的应用程序
```

页面上将要引入的CSS和JavaScript文件如下：

```html
<!DOCTYPE HTML>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Let's Rock!</title>
  <link rel="stylesheet" href="/assets/dist/dist-dev.css" />
</head>
<body>

... 

<script type="text/javascript" src="/assets/dist/framework-dev.js"></script>
<script type="text/javascript" src="/assets/dist/app-dev.js"></script>
  
</body>
</html>
```

Nice，Zonda现在已经发动了，驾驶着它在前端的赛道上驰骋吧~

### 基本命令 / make ...
- - -

### 致谢
- - -
Lorna，没有你，我也许活得像台机器

感谢我所在的团队：E++ Studio，你们给我很多挑战和信任，让我在很多关键性项目中使用 Zonda，没有你们的支持，可能我们的很多项目中在用的是 YUI 或者 Kissy

感谢 Seajs，SPM，Nodejs，Less，Coffee 的作者，你们让前端的工作更愉快，更高效。

最后，还要感谢党国的悉心栽培，让我能在和平的社会中，坐在屏幕前敲着代码，抽着烟。
