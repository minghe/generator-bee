KISSY.add(function(S, require){

    //初始化header模块
    var header = require('./mods/header');
    header.init();

    //初始化article模块
    var article = require('./mods/article');
    article.init();

    return true;
});