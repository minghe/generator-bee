KISSY.add(function(S,require,exports,module){
/*compiled by xtemplate#3.3.3*/
var tpl = require("./content");
var XTemplateRuntime = require("kg/xtemplate/3.3.3/runtime");
var instance = new XTemplateRuntime(tpl);
module.exports = function(){
return instance.render.apply(instance,arguments);
};
});