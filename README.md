# Zonda

-------------

Zonda——Degas自家用的前端框架。

感谢和我一起建造Zonda的朋友们，亲爱的[Niko](http://niko-blog.com/)，[leohgbs](https://github.com/leohgbs)，[bronze1man](http://bs.ikm.me/)。

BUG还很多，发现一个修复一个。已在几个项目中使用，不断更新，不断学习~

## Usage ##

Building!

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

这样Zonda会将前端项目展开，包括创建前端根目录`assets`，然后将自己也移入`assets`目录中，这样就完成了初始化。

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
  
<script src="/assets/dist/dist-dev.js" type="text/javascript"></script>
<script src="/assets/dist/framework-dev.js" type="text/javascript"></script>
</body>
</html>
```

### 开发目录结构

### 实时编译Less

### 调用框架模块

### 使用Qunit和Sinon测试

### 升级Zonda

### 打包上线
