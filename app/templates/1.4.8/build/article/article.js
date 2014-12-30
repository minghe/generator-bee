KISSY.add('bee-demo/article/article',["node","./article-view","kg/xtemplate/3.3.3/runtime"],function(S ,require, exports, module) {
 var $ = require('node').all;
var tpl = require('./article-view');
var XTemplate = require("kg/xtemplate/3.3.3/runtime");
module.exports = {
    init:function(){
        S.log('article init');
        var html = new XTemplate(tpl).render({
            title:'this is article',
            content:'render by kg/xtemplate'
        });
        $('article').html(html);
    }
}
});