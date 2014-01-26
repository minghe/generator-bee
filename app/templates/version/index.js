/**
 * @fileoverview <%= comConfig.desc %>
 * @author <%= comConfig.author.name %><<%= comConfig.author.email%>>
 * @module <%= comConfig.name %>
 **/
KISSY.add(function (S, Node,Base) {
    var EMPTY = '';
    var $ = Node.all;
    /**
     * <%= comConfig.desc %>
     * @class <%= comConfig.comName %>
     * @constructor
     * @extends Base
     */
    function <%= comConfig.comName %>(comConfig) {
        var self = this;
        //调用父类构造函数
        <%= comConfig.comName %>.superclass.constructor.call(self, comConfig);
    }
    S.extend(<%= comConfig.comName %>, Base, /** @lends <%= comConfig.comName %>.prototype*/{

    }, {ATTRS : /** @lends <%= comConfig.comName %>*/{

    }});
    return <%= comConfig.comName %>;
}, {requires:['node', 'base']});



