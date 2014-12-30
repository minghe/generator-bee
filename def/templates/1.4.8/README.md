## <%=name%>

<%=name%>是由[def-bee](http://def.taobao.net/doc/#@ali/def-bee)生成。

## 调试

模块文件使用CMD规范，是无法使用源码直接调试的，需要启动本地静态服务：

    def bee dev


包配置路径指向本地服务：

    //url带有ks-debug
    if(KISSY.config('debug')){
        base = 'http://localhost:5555/src/';
    }
    KISSY.config({
        packages: [
            {
                name: '<%=name%>',
                base: base,
                ignorePackageNameInUri: true,
                combine:false
            }
        ]}
    );
    
写法请参考demo/dev_index.html。

本地服务会监听文件的改变编译xtpl模板、less。

## 线上调试

可以使用chales或fiddler代理工具，将包路径代理到本地服务路径。

## 打包构建

运行 def build -l 即可。

## 生成的目录结构

    bee-demo           // 工程名，也是库名
    |      |-----src    // 源码目录
    |      |     |---------index.js     // index页面入口脚本
    |      |     |---------index.less     // index页面样式
    |      |-----build    // 发布目录
    |      |     |---------deps.js     // 模块依赖表
    |      |-----demo    // demo目录
    |      |-----build    // 发布目录
    |      |-----README.md      // 库介绍
    |      |-----gulpfile.js   // gulp打包时使用的配置信息
    |      |-----package.js     // 依赖包配置