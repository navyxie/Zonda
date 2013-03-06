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

<script src="/assets/dist/framework-dev.js" id="seajsnode" data-main="/assets/dist/dist-dev.js" ></script>
  
</body>
</html>
```

Nice，Zonda现在已经发动了，驾驶着它在前端的赛道上驰骋吧~

### CSS/Less & Images
- - -

Less dir: `assets/ui/less`，放置你的项目的样式

Images dir: `assets/ui/images`，你项目中用到的图片文件

Bootstrap dir: `assets/vendor/Zonda/ui/less`，Zonda默认提供使用Bootstrap作为UI基础，在`assets/ui/less/config.less`中，`@import`了Bootstrap的Less源文件，如果不需要Bootstrap，可以在`config.less`将该行注释，但真心不建议这么做，Bootstrap可是个好东西。

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
- - -

Javascript dir: `assets/src`，这里放置你的项目源代码。如果使用CoffeeScript，那么直接将Coffee文件编译到当前目录下就行了，推荐一个Vim-CoffeeScript插件[vim-coffee-script](https://github.com/kchmck/vim-coffee-script)

Zonda dir: `assets/vendor/Zonda`，这里是Zonda的框架代码，框架里已经包含了一些必要的库，都已做成seajs module，包括：

```
SeaJs v2.0.0pre
jQuery
Underscore
Backbone
Bootstrap(jQuery plugins)
Mustache
```

`/assets/dist/framework-dev.js`
实现思路：
在开发模式下(dev)，该文件就是 SeaJs 源码加上 SeaJs 配置文件。
SeaJs 的配置文件为 env.js (以后有时间了可以考虑使用 Yaml，或者直接 CoffeeScript )，用工具将 `assets/vendor/Zonda/vendor` 以及 `assets/vendor/` 读取一遍，生成出 env.js 需要使用的 SeaJs 的 `alias`，然后将生成好的 env.js cat 到 SeaJs 源代码底部，这样就不需要SeaJs的data-main了。当有第三方模块更新，或者 SeaJs 更新时，只需要重新执行 `./build.sh dev` 即可。

env.js 应该大概是这个样子：

```javascript
seajs.config({
  base: "/assets",
  alias: {
    "jquery" : "vendor/Zonda/vendor/jquery/1.9.1/jquery/src/jquery"
    // ...
  },
  plugins: ["text","nocache"],
  charset: "utf-8"
});
```

** Todo **
测试 SeaJs v2.0.0pre，并打包一个jQuery，并在项目中调用SeaJs和jQuery API

### 实时编译Less

### 调用框架模块

### 使用Qunit和Sinon测试

### 升级Zonda

### 打包上线
