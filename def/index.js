'use strict';
var util = require('util');
var path = require('path');
var yeoman  = require('yeoman-generator');
var fs = require('fs');

module.exports = Bee;

function Bee(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);
    this.cwd = options.env.cwd;
    this.kissy = '1.4.8';
    //工程名称
    this.name = getProjectName(this);
}

util.inherits(Bee, yeoman.generators.NamedBase);

var prt = Bee.prototype;

prt.copyFile = function(){
    var kissyDir = this.kissy+'/';
    this.template(kissyDir+'abc.json','abc.json');
    this.template(kissyDir+'gulpfile.js','gulpfile.js');
    this.template(kissyDir+'demo/dev_index.html', 'demo/dev_index.html');
    this.template(kissyDir+'demo/online_index.html', 'demo/online_index.html');
};

/**
 * 获取工程名称
 */

function getProjectName(that){
    var root = that.cwd;
    return path.basename(root);
}