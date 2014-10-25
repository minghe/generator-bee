var $ = require('node').all;
var contentRender = require('./content-render');
module.exports = {
    init:function(){
        var html = contentRender({
            title:'this is article',
            content:'render by kg/xtemplate'
        });
        $('article').html(html);
    }
}