'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');
var path = require('path');
var url = require('url');
var generator = require('abc-generator');
var urllib = require('urllib');
require('date-utils');

var API = 'http://110.75.20.144:9999/api/loginfo'
// ?method=getJSRefer&jsUrls=http://a.tbcdn.cn/s/kissy/gallery/uploader/1.5/aliUploader-min.js&startTime=1385560400&count=100

module.exports = AppGenerator

function AppGenerator(args, options, config) {
    generator.UIBase.apply(this, arguments);
    this.comConfig = comConfig(this);

    this._initPath(args[0]);

}

util.inherits(AppGenerator, generator.UIBase);

AppGenerator.prototype.getReferData=function(){
    var cb = this.async();

    urllib.request(API,{
        method:'GET',
        dataType:'json',
        data:{
            method:'getJSRefer',
            startTime:Math.floor(Date.today().addDays(-7).getTime()/1000),
            count:100,
            jsUrls:this.jsPath
        }

    },function(err,data,res){
        //{url:,stat_date:,referUrl:,count:}
        if(err||data.retCode!=0){
            console.log('获取refer出错，错误信息如下');
            if(err){
                console.error(err);
            }else{
                console.error(data);
            }
            return;
        }
        this.referData=data.content.referResult;
        cb();
    }.bind(this))
}


AppGenerator.prototype.dataHandle = function(){
    var referMap = {};
    console.log(this.referData)
    this.referData.forEach(function(referItem){
        var urlObj = url.parse(referItem.referUrl);
        if(!referMap[urlObj['host']]){
            referMap[urlObj['host']] = referItem.count;
        }else{
            referMap[urlObj['host']] += referItem.count;
        }
    });

    if(referMap['null']){
        referMap['未知'] = referMap['null'];
        delete  referMap['null'];
    }

    this.referMap = referMap;
}

AppGenerator.prototype.output=function(){
    console.log('yo kpm:refer '+ this.filePath +' 结果如下(7日内)：')
    for(var host in this.referMap){
        console.log('域名：' + host + '  访问次数：' + this.referMap[host] )
    }
}

AppGenerator.prototype._initPath=function(oPath){
    var fragments;
    if(oPath){
        fragments = oPath.split('/');
        if(fragments.length == 1){
            fragments.unshift(this.comConfig.version);
        }
        this.jsPath = fragments.join('/');

        if(this.jsPath.slice(-3) !== '.js'){
            this.jsPath += '.js';
        }
    }else{
        this.jsPath = this.comConfig.version + '/index-min.js'
    }
    this.filePath = this.jsPath;
    this.jsPath = 'http://a.tbcdn.cn/s/kissy/gallery/' + this.comConfig.name +'/'+ this.jsPath ;

}



function comConfig(that){
    var jsonFile = './abc.json';
    var sAbcJson = that.readFileAsString(jsonFile);
    return JSON.parse(sAbcJson);
}
