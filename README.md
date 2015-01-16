![http://gtms04.alicdn.com/tps/i4/T1i9hTFpBnXXcDeDnx-300-80.png](http://gtms04.alicdn.com/tps/i4/T1i9hTFpBnXXcDeDnx-300-80.png)

## generator-bee

**generator-bee**是kissy简单工程构建器，跟generator-xcake和generator-clam有所不同，强调简单和快速，没有复杂的目录分级和复杂的命令功能，不是以页面作为划分维度，适用于小工程构建。

generator-bee 遵循最新的kissy规范，由kissy小组维护，会生成demo页面和测试用例范例。

* [demo工程传送门](https://github.com/minghe/bee-demo)
* [在线demo](http://apebook.org/bee-demo/demo/dev_index.html)

## 安装

安装yeoman

    npm install yo gulp -g

安装kissy-gallery目录生成器

    npm install generator-bee -g

生成组件目录

新建个工程目录，进入执行命令：

    yo bee

## 调试

模块文件使用CMD规范，是无法使用源码直接调试的，所以bee 内置了个本地静态服务，运行：

    gulp

会编译文件到build目录，同时会起一个本地server，访问：[http://localhost:5555/bee-demo/index.js](http://localhost:5555/bee-demo/index.js)，就是访问bee-demo/src/index.js文件。

包配置路径指向本地服务：

    //url带有ks-debug
    if(KISSY.config('debug')){
        base = 'http://localhost:5555';
    }
    KISSY.config({
        packages: [
            {
                name: 'bee-demo',
                base: base,
                ignorePackageNameInUri: true,
                debug: true,
                combine:false
            }
        ]}
    );
    
写法请参考demo/dev_index.html。


## 构建

打包文件

    gulp

监听文件改变实时编译

    gulp watch

默认编译less和生成kissy模块名和依赖表。

## 生成的目录结构

    bee-demo           // 工程名，也是库名
    |      |-----src    // 源码目录
    |      |     |---------index.js     // index页面入口脚本
    |      |     |---------mods     // 依赖的业务模块
    |      |     |---------index.less     // index页面样式
    |      |-----build    // 发布目录
    |      |     |---------deps.js     // 模块依赖表
    |      |-----demo    // demo目录
    |      |-----test    // 测试用例目录
    |      |-----build    // 发布目录
    |      |-----README.md      // 库介绍
    |      |-----gulpfile.js   // gulp打包时使用的配置信息
    |      |-----package.js     // 依赖包配置

## 代码规范

模块文件使用CMD规范。

    //初始化header模块
    var header = require('./mods/header');
    header.init();
    
    //初始化article模块
    var article = require('./mods/article');
    article.init();

使用**require()**来引用模块。

## 工程内使用kg组件

编辑bower.json：

    "dependencies": {
        "reactive": "kg/reactive#0.2.0"
    }
    
格式为 kg/组件名#版本号 。

然后运行bower install ，会自动拉取组件到src/kg目录。

业务模块引用组件：

    var Reactive = require('./kg/reactive/index');

## CHANGELOG

### v5.2.2

* 默认任务增加xtpl打包

### v5.2.0

* 修正kmc打包错误
* 优化源码目录结构

### v5.0.9

* 增加def的适配
* 优化打包文件

### v5.0.6

* 修改demo地址

### v5.0.5

* 去掉5.0的支持
* 优化调试方式
* 修正本地服务器css加载错误

### v5.0.2

* 优化代码
* 去掉gulpfile.js中得无用代码
* 增加对xtpl文件的编译
* 1.4.7更新为1.4.8

### v5.0.1

* 使用新的gulp插件


### v5.0.0

* 适配kissy5.0.0

### v1.0.3

* 优化brower配置

### v1.0.2

* 增加kg brower配置

### v1.0.1

* kissy1.4.7
* 使用gulp打包
* 使用kclean优化代码
* 去掉kissy mini支持

### v0.0.2

* 新增kissy mini工程支持