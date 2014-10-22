var gulp = require('gulp');
var kmc = require('gulp-kmc');
var less = require('gulp-less');
var css = require('gulp-mini-css');
var kclean = require('gulp-kclean');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var clean = require('gulp-clean');
var filter = require('gulp-filter');
var src = "./src",
    dest = "./build";

//包配置
var pkg = "<%=name%>";

//编译模板
gulp.task('xtpl', function() {
    gulp.src(src+"/lib/*.xtpl.html")
        .pipe(kmc.xtpl())
        .pipe(gulp.dest(src+"/lib"));
});


kmc.config({
    depFilePath:dest+'/deps-debug.js',
    packages:[{
        name: pkg,
        ignorePackageNameInUri:true,
        combine:false,
        base: src
    }]
});

//使用kmc合并并编译kissy模块文件
function renderKmc(fileName){
    return gulp.src(src+"/"+fileName+".js")
        //转换cmd模块为kissy模块
        .pipe(kmc.convert({
            fixModuleName:true,
            seajs:true,
            ignoreFiles: ['-min.js']
        }))
        //合并文件
        .pipe(kmc.combo({
            minify: false,
            seajs:true,
            files:[{
                src: src+"/"+fileName+".js",
                dest: dest+"/"+fileName+"-debug.js"
            }]
        }))
        //优化代码
        .pipe(kclean({
            files:[{
                src:dest+"/"+fileName+'-debug.js',
                outputModule:'bee-kissy5-demo/'+fileName
            }]
        }))
        .pipe(gulp.dest(dest))
        .pipe(filter(fileName + '-debug.js'))
        .pipe(uglify())
        .pipe(rename(fileName + '.js'))
        .pipe(gulp.dest(dest));
}

gulp.task('kmc', function() {
    //处理index.js
    return renderKmc('index');
});
gulp.task('modulex',['kmc'],function(){
    gulp.src(dest+'/deps-debug-min.js')
        .pipe(rename(function(path){
            path.basename = path.basename.replace('-debug-min','');
        }))
        .pipe(gulp.dest(dest));
    gulp.src(dest+'/deps-debug-min.js')
        .pipe(clean());
});

gulp.task('css', function(){
    gulp.src(src+'/*.less')
        .pipe(less())
        .pipe(rename({suffix: "-debug"}))
        .pipe(gulp.dest(dest))
        .pipe(filter('*-debug.css'))
        .pipe(css())
        .pipe(rename(function (path) {
            path.basename = path.basename.replace('-debug','');
        }))
        .pipe(gulp.dest(dest));
});

gulp.task('clean', function(){
    gulp.src(dest).pipe(clean());
});

gulp.task('watch', function() {
    gulp.watch(src+'/**/*.js', ['kmc']);
    gulp.watch(src+'/**/*.less', ['css']);
});

gulp.task('default', ['clean','modulex','css']);