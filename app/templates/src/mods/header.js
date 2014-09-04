var $ = require('node').all;
module.exports = {
    init:function(){
        S.log('header init');
        $('header').html('this is header');
    }
}