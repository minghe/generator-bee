## <%=name%>

<%=name%>是由[generator-bee](https://github.com/kissyteam/generator-bee)。

## 调试

模块文件使用CMD规范，是无法使用源码直接调试的，所以bee 内置了个本地静态服务，运行：

    gulp

会编译文件到build目录，同时会起一个本地server，访问：[http://localhost:5555/<%=name%>/index.js](http://localhost:5555/<%=name%>/index.js)，就是访问<%=name%>/src/index.js文件。

包配置路径指向本地服务：

    //url带有ks-debug
    if(KISSY.config('debug')){
        base = 'http://localhost:5555/<%=name%>/';
    }
    KISSY.config({
        packages: [
            {
                name: '<%=name%>',
                base: base,
                ignorePackageNameInUri: true,
                debug: true,
                combine:false
            }
        ]}
    );
    
写法请参考demo/dev_index.html。

## 线上调试

可以使用chales或fiddler代理工具，将包路径代理到本地服务路径。

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