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


    this.on('end',function(){
        //this.installDependencies();
        console.log("目录和文件初始化完成！");
    })
}

util.inherits(Bee, yeoman.generators.NamedBase);

var prt = Bee.prototype;

prt.welcome = function(){
    // welcome message
    var welcome = '\n欢迎使用generator-bee！\n';

    console.log(welcome);
};


prt.ask = function(){
    var cb = this.async();
    //代码是否基于kissy5
    var prompts = [{
        name: 'isKissy5',
        message: '是否基于kissy5:',
        default: 'y'
    }];

    this.prompt(prompts, function (props) {
        this.isKissy5 = props.isKissy5.toLowerCase()==='y'?true:false;
        this.kissy = this.isKissy5 && 'kissy5.0.0' || 'kissy1.4.7';
        cb();
    }.bind(this));
}

prt.mk = function(){
    var fold = ['demo','build','src'];
    for(var i=0;i<fold.length;i++){
        this.mkdir(fold[i]);
    }
};

prt.copyFile = function(){
    var kissyDir = this.isKissy5 && 'kissy5/' || '';
    this.template(kissyDir+'gulpfile.js','gulpfile.js');
    this.template(kissyDir+'bower.json','bower.json');
    this.template(kissyDir+'.bowerrc','.bowerrc');
    this.copy(kissyDir+'_.gitignore','.gitignore');
    this.template(kissyDir+'_package.json','package.json');
    this.template(kissyDir+'README.md', 'README.md');
    this.template(kissyDir+'demo/dev_index.html', 'demo/dev_index.html');
    this.template(kissyDir+'demo/online_index.html', 'demo/online_index.html');

    this.copy(kissyDir+'src/index.js', 'src/index.js');
    this.copy(kissyDir+'src/index.css', 'src/index.css');
    this.copy(kissyDir+'src/index.less', 'src/index.less');
    this.copy(kissyDir+'src/mods/header.js', 'src/mods/header.js');
    this.copy(kissyDir+'src/mods/article.js', 'src/mods/article.js');
};

/**
 * 获取工程名称
 */

function getProjectName(that){
    var root = that.cwd;
    return path.basename(root);
}



