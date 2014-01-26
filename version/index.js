'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');
var generator = require('abc-generator');
var walk = require('walk');

module.exports = AppGenerator

function AppGenerator(args, options, config) {
    generator.UINamedBase.apply(this, arguments);
    this.version = args[0];
}


util.inherits(AppGenerator, generator.UINamedBase);




AppGenerator.prototype.comConfig = function(){
    var jsonFile = './abc.json';
    var sAbcJson = this.readFileAsString(jsonFile);
    this.comConfig = JSON.parse(sAbcJson);
}


AppGenerator.prototype.copy = function(){
    var curVer = this.comConfig.version;
    if(this.version == curVer) return false;
    copyDir(curVer,this.version);
}

AppGenerator.prototype.versionHandle = function(){
    var replaceMap = {
        './abc.json':'"version":\\s*"([0-9.]{3,})"',
        './totoro-config.json':'"runner":"\\./([0-9.]{3,})/test/runner\\.html"',
        './package.json':'"version":\\s*"([0-9.]{3,})\\.\\d"'
    };
    var name=this.comConfig.name;
    var currentVersion = this.comConfig.version;
    var version = this.version;
    var self=this;
    ['test','demo','guide','meta'].forEach(function(dir){
        walk.walk(path.join(version,dir)).on('file',function(dirPath,stat,next){
            var reg=new RegExp('gallery/'+ name +'/([0-9.]{3,})');
            var filePath = path.join(dirPath,stat.name);
            self._replaceFileContent(filePath,reg,version);
            next();
        });
    });


    for(var filePath in replaceMap){
        this._replaceFileContent(filePath,replaceMap[filePath],version);
    }

}


AppGenerator.prototype._replaceFileContent=function(filePath,exp,value){
    if(typeof exp === 'string'){
        exp = new RegExp(exp);
    }
    this.writeFileFromString(this.readFileAsString(filePath).replace(exp,function(str,matchStr){
        var result = str.replace(matchStr,value);
        console.log('kpm 正在修改',filePath+' 文件:  '+str+' --> '+result);

        return result;
    }),filePath);
}

/**
 * @param {String} origin 原始目录，即待复制的目录
 * @param {String} target 目标目录
 */
function copyDir(origin,target,cb){
    //如果原始目录不存在，则推出
    if(!path.existsSync(origin)){
        console.log(origin + 'is not exist......');
    }
    //如果目标目录不存在就创建一个
    if(!path.existsSync(target)){
        fs.mkdirSync(target);
    }
    //异步读取目录中的内容，把非黑名单中的目录或者文件复制到目标目录下
    var datalist= fs.readdirSync(origin);

        for(var i=0;i<datalist.length;i++){
            var oCurrent = origin + '/' + datalist[i];
            var tCurrent = target + '/' + datalist[i];
            //console.log(fs.statSync(origin + '/' + datalist[i]).isFile());

            //如果当前是文件,则写入到对应的目标目录下
            if(fs.statSync(oCurrent).isFile()){
                fs.writeFileSync(tCurrent,fs.readFileSync(oCurrent, ''),'');
            }
            //如果是目录，则递归
            else if(fs.statSync(oCurrent).isDirectory()){
                copyDir(oCurrent,tCurrent);
            }

        }

}

