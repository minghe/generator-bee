var gulp = require('gulp');
var kmc = require('gulp-kmc');
var less = require('gulp-less');
var css = require('gulp-mini-css');
var kclean = require('gulp-kclean');
var rename = require("gulp-rename");
var filter = require('gulp-filter');
var minify = require('gulp-minify');
var src = "./src",
    dest = "./build";

//包配置
var pkg = "<%=name%>";
var comboSuffix = '-combo';

//编译模板
gulp.task('xtpl', function() {
    gulp.src(src+"/lib/*.xtpl.html")
        .pipe(kmc.xtpl())
        .pipe(gulp.dest(src+"/lib"));
});


kmc.config({
    packages:[{
        name: pkg,
        base: src
    }]
});

//使用kmc合并并编译kissy模块文件
function renderKmc(fileName){
    return gulp.src(src+'/**/*.js')
        //转换cmd模块为kissy模块
        .pipe(kmc.convert({
            ignoreFiles: ['-min.js']
        }))
        //合并文件
        .pipe(kmc.combo({
            deps:'deps.js',
            files:[{
                src: pkg+"/"+fileName+".js",
                dest: fileName + comboSuffix+".js"
            }]
        }))
        //优化代码
        .pipe(kclean({
            files:[{
                src:fileName+comboSuffix+'.js',
                outputModule:pkg+'/'+fileName
            }]
        }))
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.js'
            }
        }))
        .pipe(filter(function(file){
            return [fileName+comboSuffix+'-debug.js'].indexOf(file.relative) == -1;
        })).pipe(rename(function(file){
            file.basename = file.basename.replace(fileName+comboSuffix,fileName);
        }))
        .pipe(gulp.dest(dest));
}

gulp.task('kmc', function() {
    //处理index.js
    return renderKmc('index');
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

gulp.task('watch', function() {
    gulp.watch(src+'/**/*.js', ['kmc']);
    gulp.watch(src+'/**/*.less', ['css']);
});

gulp.task('default', ['kmc','css']);