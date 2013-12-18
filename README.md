a yeoman generator for kissy-gallery

## install
### 安装yeoman

````sh
npm install yo grunt-cli -g
````

### 安装kissy-gallery目录生成器

````sh
npm install generator-kissy-gallery -g
````

### 生成组件目录

比如你的组件目录是offline，进入该目录，然后执行命令：

````sh
yo kissy-gallery 1.0
````

默认版本为1.0。

### 打包组件

在组件目录下执行如下命令：

````sh
grunt
````

可以修改gruntfile.js来自定义组件的构建。

### 发布一个新的版本

在组件目录下执行如下命令：

````sh
yo kissy-gallery:version 1.1
````

##changelog

###0.3.1

* 增加flexcombo插件，支持本地调试

插件用法看https://npmjs.org/package/grunt-flexcombo
 ###0.3.0

* #4 增加组件名称的处理
* #4 优化demo的模块加载
* #4 增加githubName字段，用于kpm

###0.2.8

* fix #3

###0.2.7

* 输出问询提示
* Gruntfile优化

###0.2.5

* 修改demo kissy的引用路径（http://g.tbcdn.cn/kissy/k/1.3.0/kissy-min.js）
* demo 增加kissy dpl样式

###0.2.4
*修正merge命令bug

###0.2.3

*优化文档

###0.2.0
*merge子命令实现，自动merge的功能
*实现merge的同时同步文档

###0.1.9
*去掉多余依赖

###0.1.8
*修正编码问题

###0.1.7
*打包时中文ascii化

###0.1.6
*优化README.md

###0.1.5
*修正yo kissy-gallery:version命令无效的bug