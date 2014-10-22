## <%=name%>

<%=name%>是。


### 目录结构：

    <%=name%>           // 工程名，也是库名
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


打包运行：

    gulp

开发阶段开启文件实时编译：

    gulp watch