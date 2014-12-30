KISSY.add(function(S,require,exports,module){
/*compiled by xtemplate#3.3.3*/
var ret = module.exports = function content(undefined){
var t;
var t0;
var t1;
var t2;
var t3;
var t4;
var t5;
var t6;
var t7;
var t8;
var t9;
var tpl = this;
var root = tpl.root;
var buffer = tpl.buffer;
var scope = tpl.scope;
var runtime = tpl.runtime;
var name = tpl.name;
var pos = tpl.pos;
var data = scope.data;
var affix = scope.affix;
var nativeCommands = root.nativeCommands;
var utils = root.utils;
var callFnUtil = utils["callFn"];
var callCommandUtil = utils["callCommand"];
var rangeCommand = nativeCommands["range"];
var foreachCommand = nativeCommands["foreach"];
var forinCommand = nativeCommands["forin"];
var eachCommand = nativeCommands["each"];
var withCommand = nativeCommands["with"];
var ifCommand = nativeCommands["if"];
var setCommand = nativeCommands["set"];
var includeCommand = nativeCommands["include"];
var parseCommand = nativeCommands["parse"];
var extendCommand = nativeCommands["extend"];
var blockCommand = nativeCommands["block"];
var macroCommand = nativeCommands["macro"];
var debuggerCommand = nativeCommands["debugger"];


buffer.data += '<h1>';
var id0 = ((t=(affix.title)) !== undefined ? t:((t = data.title) !== undefined ? t :scope.resolveLooseUp(["title"])));
buffer = buffer.writeEscaped(id0);
buffer.data += '</h1>\n<p>';
pos.line = 2;
var id1 = ((t=(affix.content)) !== undefined ? t:((t = data.content) !== undefined ? t :scope.resolveLooseUp(["content"])));
buffer = buffer.writeEscaped(id1);
buffer.data += '</p>';
return buffer;
};
ret.TPL_NAME = module.id || module.name;
});