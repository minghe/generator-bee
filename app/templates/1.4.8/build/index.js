KISSY.add("bee-demo/index.js", ["bee-demo/header/header","bee-demo/article/article"], function(S ,require, exports, module) {
var beeDemoHeaderHeader = require("bee-demo/header/header");
var beeDemoArticleArticle = require("bee-demo/article/article");
var beeDemoIndex;
beeDemoIndex = function (exports) {
  //初始化header模块
  var header = beeDemoHeaderHeader;
  header.init();
  //初始化article模块
  var article = beeDemoArticleArticle;
  article.init();
  return exports;
}();
});