  'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');
var GitHubApi = require("github");
var generator = require('abc-generator');
var querystring = require('querystring');
var http = require('http');

//kissygalleryteam的token
var GLOBAL_TOKEN = '9a47a5d3e1b466ff413beee93f5216a0ad08d8cd';

var gitHubId;

var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    timeout: 5000
});

module.exports = AppGenerator;



/**
 * 日期格式化
 * @param  {Date} date new Date();
 * @param  {String} fmt  日期格式：yyyy-MM-dd hh:mm:ss
 * @return {String}      yyyy-MM-dd hh:mm:ss
 */

function formatDate(date, fmt) { //author: meizz 
    var o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "h+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3)
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}


/**
 * 获取用户名 将用户输入进来的github账号处理下
 * @param  {String} id 输入的账户
 * @return {String}    返回值
 */

function getUserId(id) {
    if (id.indexOf('@') !== -1) {
        return id.split('@')[0];
    }
    return id;
}


/**
 * 将JSON转换成字符串，包含换行
 * @param {OBject} oJson JSON对象
 * @return string
 */

function jsonToString(oJson) {
    var arrStr = [];
    for (var i in oJson) {
        if(typeof oJson[i] !== 'string'){
            arrStr.push('    "' + i + '":' + jsonToString(oJson[i]));
        }else{
            arrStr.push('    "' + i + '":"' + oJson[i] + '"');
        }        
    }
    return '{\n' + arrStr.join(',\n') + '\n}';
}

function AppGenerator(args, options, config) {
    generator.UIBase.apply(this, arguments);
    this.version = args[0];
}

util.inherits(AppGenerator, generator.UIBase);

AppGenerator.prototype.comConfig = function() {
    var jsonFile = './abc.json';
    var sAbcJson = this.readFileAsString(jsonFile);
    this.comConfig = JSON.parse(sAbcJson);
}


AppGenerator.prototype.writeJson = function(file, fnMap) {
    if (!file || !fnMap) return false;
    var sAbcJson = this.readFileAsString(file);
    var oAbcJson = JSON.parse(sAbcJson);
    oAbcJson = fnMap.call(this, oAbcJson);
    this.write(file, jsonToString(oAbcJson));
}



AppGenerator.prototype.ask = function() {
    var cb = this.async();
    var initGithubId = this.comConfig.githubName;
    var prompts = [];
    if (!initGithubId) {
        prompts = [{
                name: 'name',
                message: 'Input your github account:'
            }
        ];
    }


    this.prompt(prompts, function(props) {
        gitHubId = initGithubId ? initGithubId : props.name;
        if(!initGithubId){
            this.writeJson('./abc.json', function(json) {
                json.githubName = gitHubId;
                return json;
            });            
        }
        cb();
    }.bind(this));
}


AppGenerator.prototype.merge = function() {


    github.authenticate({
        type: "oauth",
        token: GLOBAL_TOKEN
    });

    var moduleName = this.comConfig.name;
    var title = 'Pulled at ' + formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss') + ' by kpm';
    var endGithubId = getUserId(gitHubId);
    console.log('Sending pullRequest ...');
    github.pullRequests.create({
        repo: moduleName,
        user: 'kissygalleryteam',
        title: title, // 注释标题
        // body: 'test', // 注释内容
        base: 'master', // 固定
        head: endGithubId + ':master' //自己修改的库名
    }, function(e, data) {
        if (e) {
            console.log('error' + e);
            return;
        }
        console.log('PullRequest success,pulled number '+data.number);
        console.log('Merging...');

        var postData = querystring.stringify({
            name: moduleName,
            type: '',
            publish: 0,
            number: data.number,
            username: 'everyone',
            password: 'nobody'
        });
    	
		

        var options = {
            host: 'kpm.f2e.taobao.net',
            port: 80,
            path: '/packages/publish',
            method: 'POST',
            auth: 'everyone:nobody',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postData.length
            }
        };

        var req = http.request(options, function(res) {
            var strData = '';
            res.on('data', function(data) {
                strData += data;
            });


            res.on('end', function() {
                if (JSON.parse(strData).success === 1) {
                    console.log('Merged success');
                } else {
                    console.log('Merged Error \n' + strData);
                }
            });
        });
        req.write(postData + "\n");
        req.end();
    });
}
