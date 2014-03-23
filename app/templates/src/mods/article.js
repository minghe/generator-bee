KISSY.add(function(S,require){
    var $ = require('node').all;
    return {
        init:function(){
            S.log('article init');
            $('article').html('this is article');
        }
    }
});