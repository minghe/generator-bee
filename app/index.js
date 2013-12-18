'use strict';
var util = require('util');
var path = require('path');
var generator = require('abc-generator');
var fs = require('fs');

module.exports = Gallery;

function Gallery(args, options, config) {
    generator.UIBase.apply(this, arguments);
    this.version = args[0] || '1.0';
    this.cwd = options.env.cwd;
    //库地址
    this.reposName = getReposName(this);
    //组件名称
    this.comName = getComName(this.reposName);
    if (fs.existsSync('abc.json')) {
        this.abcJSON = JSON.parse(this.readFileAsString('abc.json'));
    } else {
        this.abcJSON = {}
    }

    this.on('end',function(){
        this.installDependencies();
        console.log("组件目录和文件初始化完成！");
        console.log("\n打包组件运行：grunt");
    })
}

util.inherits(Gallery, generator.UIBase);

var prt = Gallery.prototype;

prt.askFor = function(){
    //打印欢迎消息
    console.log(this.abcLogo);
}
prt.askAuthor = function(){
    var cb = this.async();

    var author = {
        name: 'kissy-team',
        email: 'kissy-team@gmail.com'
    };

    if (this.abcJSON && this.abcJSON.author) {
        var abcAuthor = this.abcJSON.author;
        author.name = abcAuthor.name || 'kissy-team';
        author.email = abcAuthor.email || 'kissy-team@gmail.com';
    }
    console.log('阿里同学author请使用花名，email请使用内网邮箱，tag请使用中文（多个英文逗号隔开），github账户名用于代码同步');
    var prompts = [{
        name: 'author',
        message: 'author of component:',
        default: author.name
    },{
        name: 'email',
        message: 'email of author:',
        default: author.email
    },{
        name: 'tag',
        message: 'tag of component:'
    },{
        name: 'githubName',
        message: 'user name of github:'
    }];

    this.prompt(prompts, function (props) {
        this.author = props.author;
        this.email = props.email;
        this.tag = props.tag;
        this.githubName = props.githubName;
        cb();
    }.bind(this));
}
prt.copyFile = function(){
    this.copy('Gruntfile.js','Gruntfile.js');
    this.copy('_.gitignore','.gitignore');
    this.template('abc.json','abc.json');
    this.template('_package.json','package.json');
    this.template('README.md', 'README.md');

}

prt.mk = function(){
    var version = this.version;
    this.mkdir(version);
    var fold = ['demo','spec','build','plugin','guide','meta'];
    for(var i=0;i<fold.length;i++){
        this.mkdir(path.join(version, fold[i]));
    }
}

prt.createVersion = function(){
    var version = this.version;
    this.comConfig = comConfig(this);
    this.template('index.js', path.join(version, 'index.js'));
    this.template('alias.js', path.join(version, 'meta','alias.js'));
    this.template('modules.js', path.join(version, 'meta','modules.js'));
    this.template('index.md', path.join(version, 'guide', 'index.md'));
    this.template('index.html', path.join(version, 'demo', 'index.html'));
}

/**
 * Scan Project
 */
prt._scan = function _scan() {
  // fix windows path
  var versionMatch = path.join('*.*/');
  var versions = this.expand(versionMatch);

  var abc = JSON.parse(this.readFileAsString('abc.json'));
  var version = abc.version;

  versions = versions.

    filter(function(v){
      return /^(\d.\d)/.test(v);
    }).
    map(function(v) {
    v = v.match(/^(\d.\d)/)[1];
    return {
      version: v,
      current: v === version
    }
  });
  console.log(versions);

  return {
    versions: versions
  };

};
/**
 * 获取库名称
 */

function getReposName(that){
    var root = that.cwd;
    return path.basename(root);
}
/**
 * 获取组件名称
 */
function getComName(reposName){
    var first = reposName.substring(0,1).toUpperCase();
    var comName = first + reposName.substring(1);
    comName = comName.replace(/-(\w)/g,function($1,$2){
        return $2.toUpperCase();
    });
    return comName;
}
function comConfig(that){
    var jsonFile = './abc.json';
    var sAbcJson = that.readFileAsString(jsonFile);
    return JSON.parse(sAbcJson);
}

