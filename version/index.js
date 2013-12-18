'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');
var generator = require('abc-generator');

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
    this.writeJson('./abc.json',function(json){
        json.version = this.version;
        return json;
    });
    this.writeJson('./package.json',function(json){
        json.version = this.version+'.0';
        return json;
    });

}

AppGenerator.prototype.writeJson = function(file,fnMap){
    if(!file || !fnMap) return false;
    var sAbcJson = this.readFileAsString(file);
    var oAbcJson = JSON.parse(sAbcJson);
    oAbcJson = fnMap.call(this,oAbcJson);
    this.write(file,JSON.stringify(oAbcJson));
}

/**
 * @param {String} origin 原始目录，即待复制的目录
 * @param {String} target 目标目录
 */
function copyDir(origin,target){
    //如果原始目录不存在，则推出
    if(!path.existsSync(origin)){
        console.log(origin + 'is not exist......');
    }
    //如果目标目录不存在就创建一个
    if(!path.existsSync(target)){
        fs.mkdirSync(target);
    }
    //异步读取目录中的内容，把非黑名单中的目录或者文件复制到目标目录下
    fs.readdir(origin,function(err,datalist){
        if(err) return;
        //console.log(datalist);
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
    });
}

