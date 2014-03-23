KISSY.add(function(S,require){
    var $ = require('node').all;
    return {
        init:function(){
            S.log('header init');
            $('header').html('this is header');
        }
    }
});