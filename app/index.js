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
        this.installDependencies();
        console.log("目录和文件初始化完成！");
    })
}

util.inherits(Bee, yeoman.generators.NamedBase);

var prt = Bee.prototype;

prt.welcome = function(){
    // welcome message
    var welcome = '\n欢迎使用generator-bee！\n';

    console.log(welcome);
}

prt.askFor = function(){
    var cb = this.async();

    var prompts = [
        {
            name: 'combo',
            message: '是否使用依赖表combo文件（Y/N）:',
            default: 'Y'
        },
        {
            name: 'mini',
            message: '是否基于kissy mini（Y/N）:',
            default: 'N'
        }
    ];

    this.prompt(prompts, function (props) {
        this.combo = props.combo;
        this.mini = props.mini;
        cb();
    }.bind(this));
}


prt.mk = function(){
    var fold = ['demo','test','build','src','demo'];
    for(var i=0;i<fold.length;i++){
        this.mkdir(fold[i]);
    }
}

prt.copyFile = function(){
    if(this.combo === 'Y'){
        this.template('Gruntfile.js','Gruntfile.js');
    }else{
        this.template('noComboGruntfile.js','Gruntfile.js');
    }
    this.copy('_.gitignore','.gitignore');
    this.template('_package.json','package.json');
    this.template('README.md', 'README.md');
    this.template('totoro-config.json', 'totoro-config.json');
    if(this.mini === 'Y'){
        this.template('demo/dev_mini_index.html', 'demo/dev_index.html');
        this.template('demo/daily_mini_index.html', 'demo/daily_index.html');
    }else{
        this.template('demo/dev_index.html', 'demo/dev_index.html');
        this.template('demo/daily_index.html', 'demo/daily_index.html');
    }

    this.copy('src/index.js', 'src/index.js');
    this.copy('src/index.css', 'src/index.css');
    this.copy('src/index.less', 'src/index.less');
    this.copy('src/mods/header.js', 'src/mods/header.js');
    this.copy('src/mods/article.js', 'src/mods/article.js');

    this.template('test/runner.html', 'test/runner.html');
    this.template('test/runner.js', 'test/runner.js');
    this.template('test/spec/index-spec.js', 'test/spec/index-spec.js');
}

/**
 * 获取工程名称
 */

function getProjectName(that){
    var root = that.cwd;
    return path.basename(root);
}



