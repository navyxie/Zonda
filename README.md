# Zonda

-------------

Zonda——Degas自家用的前端框架。

感谢和我一起建造Zonda的朋友们，亲爱的[Niko](http://niko-blog.com/)，[leohgbs](https://github.com/leohgbs)，[bronze1man](http://bs.ikm.me/)。

BUG还很多，发现一个修复一个。已在几个项目中使用，不断更新，不断学习~

## Zonda行车手册

**目前正在对整车进行重构，处于无法发动状态，技师正在紧张的修复中。**

### 点火，起步！
- - -

`git clone https://github.com/smallsmallwolf/Zonda.git` 将Zonda拉到Web服务的文件根目录(Web服务器`/`的位置，放到这里主要是为了方便)，然后执行：

```shell
cd Zonda/tool
./build.sh init
```

执行完毕后，Zonda会根据`Zonda/project-template`创建一个前端项目模板，目录结构大致是这样的：

```coffeescript
assets/ # 前端项目根目录
  etc/ # 项目配置文件  
  vendor/ # 第三方组件
    Zonda/   
  src/ # 你的应用程序源代码 
  ui/ # 你的应用程序的UI文件
    less/
      config.less
      mixin.less
      responsive.less
    images/
    ie/
      ie.css      
  test/ # 测试你的应用程序  
  dist/ # 线上版本的应用程序代码
    dist-dev.css
    framework-dev.js
    dist-dev.js   
  tool/ # 工具(打包应用程序，Less编译工具等等)
```

页面上将要引入的CSS和Javascript文件如下：

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

### JavaScript

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
