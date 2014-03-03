[1mdiff --git a/app/templates/version/guide/index.md b/app/templates/version/guide/index.md[m
[1mindex aefc15f..111bc5f 100644[m
[1m--- a/app/templates/version/guide/index.md[m
[1m+++ b/app/templates/version/guide/index.md[m
[36m@@ -7,9 +7,16 @@[m
 * demo：[http://gallery.kissyui.com/<%= comConfig.name %>/<%= version %>/demo/index.html](http://gallery.kissyui.com/<%= comConfig.name %>/<%= version %>/demo/index.html)[m
 [m
 ## 初始化组件[m
[31m-[m
[32m+[m[41m		[m
     S.use('gallery/<%= comConfig.name %>/<%= comConfig.version %>/index', function (S, <%= comConfig.comName %>) {[m
          var <%= comConfig.name %> = new <%= comConfig.comName %>();[m
     })[m
[32m+[m[41m	[m
[32m+[m	[32m<% if(isSupportISV){ %>[m
[32m+[m[32m#### isv 组件引入方式[m[41m		[m
[32m+[m
[32m+[m	[32m<cajamodules include="kissy/1.3.0/core,kissy/gallery/<%= comConfig.name %>/<%= comConfig.version %>/index" />[m
[32m+[m[41m    [m
[32m+[m	[32m<% } %>[m
 [m
 ## API说明[m
