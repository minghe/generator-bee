![http://gtms04.alicdn.com/tps/i4/T1i9hTFpBnXXcDeDnx-300-80.png](http://gtms04.alicdn.com/tps/i4/T1i9hTFpBnXXcDeDnx-300-80.png)

## generator-bee

generator-bee是kissy简单工程构建器，强调简单和快速，没有复杂的工程分级和复杂的命令功能。

generator-bee遵循最新的kissy规范。

阿里内部环境，使用依赖表——combo的方式，不再静态合并文件。

[demo工程传送门](https://github.com/minghe/bee-demo)

* 作者：明河（剑平）

## 安装

安装yeoman

    npm install yo grunt-cli -g

安装kissy-gallery目录生成器

    npm install generator-bee -g

生成组件目录

新建个工程目录，进入执行命令：

    yo bee


## 构建

打包文件

    grunt

监听文件改变实时编译

    grunt dev

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
    |      |-----gruntfile.js   // grunt打包时使用的配置信息
    |      |-----totoro-config.js       // totoro回归工具配置文件
    |      |-----package.js     // 依赖包配置