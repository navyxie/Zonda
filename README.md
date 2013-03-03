# Zonda

-------------

Zonda——Degas自家用的前端框架。

感谢和我一起建造Zonda的朋友们，亲爱的[Niko](http://niko-blog.com/)，[leohgbs](https://github.com/leohgbs)，[bronze1man](http://bs.ikm.me/)。

BUG还很多，发现一个修复一个。已在几个项目中使用，不断更新，不断学习~

## Usage ##

Building!

重构进度：
完成Less和图片文件的摆放和编译工作。
正在进行Javascript文件目录和开发模式部分的重构。

## Zonda 原厂零件

- **JSON RPC** : RPC，数据层

    + 协议层为HTTP，可扩展WebSocket协议层
    
    + RPC客户端
    
    + RPC服务端，还未实现...

- **dialog** : 封装自Bootstrap的Modal

    + 自定义按钮，动态生成按钮，并设置点击事件回调
    
- **Backbone.sync LocalStorage 适配器**

    + 在使用Backbone时，可以将数据同步到LocalStorage

- **tips模块** : 简单强大的tooltips模块，by [Niko](http://niko-blog.com/)

    + 自定义触发tips的事件

    + tips内容可传入字符串或DOM字符串

    + 可直接在HTML中定义tips，也可在创建时通过对象传入


- **上传模块** : 自家实现的跨浏览器多文件上传。
    

    + 使用XHR上传，进度条显示；对于不能使用XHR上传的浏览器则使用iframe+同步表单上传
    
    + 跨浏览器，IE6+

    + 可配置的允许上传的文件类型

    + 两个模块事件，loading，ready
    
    + 自动生成上传文件列表
    
    + 自定义错误消息

    + TODO，自动生成的上传文件列表是根据一个模板来渲染的，考虑去掉这个模板，采用配置的方式生成DOM节点取代之


- **幻灯片模块** : 自家用的幻灯片模块。

    + 自动生成带数字或不带数字的页码，或是带缩略图的页码，以及‘next’，‘prev’按钮

    + 跨浏览器，IE6+

    + next，prev，play，stop功能

    + 多种切换效果，逐步增加中

    + 简洁可扩展的核心play()函数


- **数据验证模块** : 自家用的表单验证模块。

    + 附加方法verify，方便的验证[Bootstrap](http://twitter.github.com/bootstrap/index.html)form中的表单

    + Email验证，数字验证，必填项验证
    
    + 跨浏览器，IE6+
        
    + 简洁可爱的核心检测方式，可扩展

    + TODO，自定义错误事件，回调消息函数

    + 目前支持验证普通的 input:text，select:option，textarea，以后会慢慢添加更多类型的表单验证 ^_^

    
- **脚手架** : 实用的调试工具。
    
    + Grid System schematic，栅格系统示意图生成器。
    
## Zonda搭载的强劲零件

- [`Seajs`](http://seajs.org/docs/#intro) : 国产强劲引擎，作为核心库，进行模块的依赖管理

- [`Less`](http://lesscss.org/) : 进口涡轮增压装置，对CSS进行组织，将CSS代码模块化，可配置

- [`Bootstrap`](http://twitter.github.com/bootstrap/index.html) : 进口碳素纤维车身，强力的UI，对IE的支持不好，自己进行了一些改装，使之在IE6+环境中能正常使用

- [`Modernizr`](http://modernizr.com/) : 进口行车电脑，检测浏览器对HTML5和CSS3的支持

谢谢Seajs，Less的作者，他们让前端写代码变成一件愉悦的事情，维护起来也不再那么头疼了

### Zonda名字来源

`Pagani`的超级跑车[`Zonda`](http://www.pagani.com/zonda/default.aspx)，意大利语“风之子”之意。
![alt text](http://www.widescreenbackgrounds.net/wallpapers/background-widescreen-white-pagani-zonda-wallpapers.jpg 'Zonda')

## Zonda行车手册

**目前正在对整车进行重构，处于无法发动状态，技师正在紧张的修复中。**

### 开始使用
- - -

`git clone https://github.com/smallsmallwolf/Zonda.git` 将Zonda拉到正在建设的项目的web目录(Web程序入口处)，然后执行：

```shell
cd Zonda/tool
./build.sh init
```

这样Zonda会将前端项目展开，包括创建前端根目录`assets`，然后将自己也移入`assets/vendor`目录中，这样就完成了初始化。

在HTML中加入CSS和Javascript的引用：

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
<script src="/assets/dist/framework-dev.js" type="text/javascript"></script>
<script src="/assets/dist/dist-dev.js" type="text/javascript"></script>
</body>
</html>
```

### CSS/Less & Images
- - -

Less dir: `assets/ui/less`，放置你的项目的样式

Images dir: `assets/ui/images`，你项目中用到的图片文件

Bootstrap dir: `assets/vendor/Zonda/ui/less`，Zonda默认提供使用Bootstrap作为UI基础，在`assets/ui/less/config.less`中，`@import`了Bootstrap的Less源文件，如果不需要Bootstrap，可以在`config.less`将该行注释，** 但真心不建议这么做，Bootstrap可是个好东西 **

Less实时编译工具，这个工具可能有点小Bug，欢迎Issue：

```shell
cd assets/tool
./less-compile.sh
```

执行上面的命令将会开始监听`assets/ui/less`目录，如果文件有修改，则会编译，并将所有`@import`的Less编译成一个CSS文件(包括Bootstrap和Font Awesome)输出到`assets/dist/dist-dev.css`，也就是页面上引入的那个CSS文件。

Less编译工具使用NodeJs(v0.8.21)和Lessc(v1.3.3)，源文件在`tool/module/lessCompiler.coffee`。它目前只能提供简单的监听文件改变并编译的功能，并且将所有的Less文件编译成一个CSS。

`lessCompiler.coffee`默认会将Less中的注释去掉，如果需要保留注释以便调试，则将文件中的：

```coffeescript
lessc_command = "lessc -x"
# 去掉 -x，改成下面这样即可
lessc_command = "lessc"
```

`lessCompiler.coffee`缺少一个不将Less合并成一个CSS的功能，还缺少将`dist-dev.css`压缩的功能，以后会尝试实现的，欢迎Issue~

### JavaScript/CoffeeScript

Javascript dir: `assets/src`，这里放置你的项目源代码

Zonda dir: `assets/vendor/Zonda`，这里是Zonda的框架代码，框架里已经包含了一些必要的库，通常会及时更新，包括：

```
SeaJs
jQuery
Underscore
Backbone
Bootstrap(jQuery plugins)
Mustache
```

当项目处于开发阶段模式时，`framework-dev.js`和`dist-dev.js`都只是做一个入口，他们分别引用了：`vender`目录中的各种模块，`src`中的应用程序代码。

当项目开发完成打包上线时，Zonda将会把`vendor`中的代码打包压缩，生成一个带MD5值的文件`framework-MD5版本号`，用于替换`dist`目录下的`framework-dev.js`；上线时还会将`src`目录下的项目代码打包成一个文件`dist-MD5版本号`，替换`dist`目录下的`dist-dev.js`。

这样做的目的在于，`framework-x.js`这个文件包含了大部分常用库(jQuery,Backbone...)是不会常常变动的，当项目发布时，可以更长时间的缓存与客户端；而应用的代码`dist-x.js`随着需求的更迭，可能会在一段时间陆续更新多个版本。这样就把客户端每次更新该项目需要下载的文件数量降低到一个较小的水平。

### 实时编译Less

### 调用框架模块

### 使用Qunit和Sinon测试

### 升级Zonda

### 打包上线
