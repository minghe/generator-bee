'use strict';
var util = require('util');
var path = require('path');
var yeoman  = require('yeoman-generator');
var fs = require('fs');

module.exports = Bee;

function Bee(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);
    this.cwd = options.env.cwd;
    //工程名称
    this.name = getProjectName(this);
    this.kissy = '1.4.8';
    this.outputLog = this.arguments[0];
    this.on('end',function(){
        if(this.outputLog != 'none'){
            this.log("\n");
            console.log("目录和文件初始化完成！");
            this.log("\n");
            this.log("1.运行npm install安装工具依赖\n");
            this.log("2.运行gulp命令打包并开启调试服务器，比如bee-demo工程，http://localhost:5555/bee-demo/1.0.0/index.js，指向src/index.js\n");
            this.log("3.参考demo/dev_index.html（url加上?ks-debug）进行demo开发\n");
        }
    })
}

util.inherits(Bee, yeoman.generators.NamedBase);

var prt = Bee.prototype;

prt.welcome = function(){
    // welcome message
    var welcome = '\n\n欢迎使用bee！\nbee是kissy简单工程构建器，遵循最新的kissy规范。\nbee由kissy小组维护。\n';

    console.log(welcome);
};

prt.mk = function(){
    var fold = ['demo','build','src'];
    for(var i=0;i<fold.length;i++){
        this.mkdir(fold[i]);
    }
};

prt.copyFile = function(){
    var kissyDir = this.kissy+'/';
    this.template(kissyDir+'gulpfile.js','gulpfile.js');
    this.template(kissyDir+'bower.json','bower.json');
    this.template(kissyDir+'.bowerrc','.bowerrc');
    this.copy(kissyDir+'_.gitignore','.gitignore');
    this.template(kissyDir+'_package.json','package.json');
    this.template(kissyDir+'README.md', 'README.md');
    this.template(kissyDir+'demo/dev_index.html', 'demo/dev_index.html');
    this.template(kissyDir+'demo/online_index.html', 'demo/online_index.html');
    this.directory(kissyDir+'src', 'src');
    this.directory(kissyDir+'build', 'build');
};

/**
 * 获取工程名称
 */

function getProjectName(that){
    var root = that.cwd;
    return path.basename(root);
}



