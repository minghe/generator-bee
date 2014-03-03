/**
 * @fileOverview <%= comConfig.name %> 组件的安全适配器
 * 组件适配文档： https://github.com/lorrylockie/tpap/wiki/如何进行前端JS组件的适配工作
 */
KISSY.add(function (S, Gallery) {
    var DOM = S.DOM,
        Event = S.Event;

    /**
     * 提供一个init方法，名字任取，最后模块return即可。 用来初始化适配器的（或者匿名函数)
     * 初始化方法需要返回一个函数，用来为每个沙箱环境提供适配对象。
     *
     * ps: 页面中可能会有多个安全沙箱环境。init方法内执行的可以理解为所有沙箱共享的一些内容对象，主要提供最原始的安全适配对象和方法。(执行一次,所有沙箱共享)
     *     init返回的函数可以理解是为每个沙箱提供的安全适配对象。(执行多次，每个沙箱对对象的操作不影响其他沙箱)
     *     总结：可以理解为KISSY在frameGroup初始化的时候是一个对象，然后会copy多份，分别放到不同的沙箱环境中去执行。每个copy相互之间不影响
     * @param frameGroup 页面中的沙箱环境，frame即为沙箱，frameGroup为沙箱组。沙箱的公共环境
     * @returns {Function} 工厂获取实际的适配对象
     */
    function init(frameGroup) {
        /**
         * 因为KISSY的组件构造函数只有一个，后面可能会对构造函数本身做修改
         * 所以这里可以写一个SafeConstruector，相当于继承KISSY的组件，并且显示的声明要开放哪些api
         * 比如Calendar组件适配就行 SafeCalender 这样, 门面模式，包装下
         */
        function Safe<%= comConfig.comName %>(el, config) {
            this.inner = new <%= comConfig.comName %>(el, config);//内部实际封装了真正的组件构造函数
        }

        //为我们门面模式包装的构造函数添加需要开放给外部使用的原型方法，on和destory只是举例，哪些需要暴露的方法就写哪些就行了
        Safe<%= comConfig.comName %>.prototype.on = function (type,fnc) {
            //this.inner.on(type,fnc);
        };

        //为我们门面模式包装的构造函数添加需要开放给外部使用的原型方法
        Safe<%= comConfig.comName %>.prototype.destory = function () {
            //this.inner.destory();
        };


        //上面声明构造函数和定义原型方法相当于一个包装，下面我们就让这个包装让caja容器认识识别即可了，只需要做两步
        //----组件是一个构造函数进行初始化的，需要markCtor标记一下，让caja容器认识
        frameGroup.markCtor(Safe<%= comConfig.comName %>);

        frameGroup.grantMethod(Safe<%= comConfig.comName %>, "on");
        frameGroup.grantMethod(Safe<%= comConfig.comName %>, "destory");



        /**
         * @param context 上下文
         * @param context.mod 沙箱的模块范围，所有操作必须限定到模块范围之内去执行
         * @param context.frame 单个模块的沙箱
         * @return {Object} 实际的组件对象
         */
        return function (context) {

            //最终需要返回给
            return {
                //这里的 <%= comConfig.name %> 会自动放到KISSY.<%= comConfig.comName %>:
            <%= comConfig.comName %>: frameGroup.markFunction(function () {
                    return new Safe<%= comConfig.comName %>(arguments[0], cajaAFTB.untame(arguments[1]));
                }),
                kissy:true
            }
        }

    }

    return init;

}, {
    requires: ['./index'] //这里是本地测试时候依赖于本地的gallery,发布后要修改成线上的gallery地址， 如gallery/1.0/xxx
});
