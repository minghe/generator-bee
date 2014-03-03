## 综述

<%= comConfig.comName %>是<%= comConfig.desc %>。

* 版本：<%= version %>
* 作者：<%= comConfig.author.name %>
* demo：[http://gallery.kissyui.com/<%= comConfig.name %>/<%= version %>/demo/index.html](http://gallery.kissyui.com/<%= comConfig.name %>/<%= version %>/demo/index.html)

## 初始化组件
		
    S.use('gallery/<%= comConfig.name %>/<%= comConfig.version %>/index', function (S, <%= comConfig.comName %>) {
         var <%= comConfig.name %> = new <%= comConfig.comName %>();
    })
	
	<% if(isSupportISV){ %>
#### isv 组件引入方式		

	<cajamodules include="kissy/1.3.0/core,kissy/gallery/<%= comConfig.name %>/<%= comConfig.version %>/index" />
    
	<% } %>

## API说明
