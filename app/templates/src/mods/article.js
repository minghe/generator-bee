var $ = require('node').all;
module.exports = {
    init:function(){
        S.log('article init');
        $('article').html('this is article');
    }
}