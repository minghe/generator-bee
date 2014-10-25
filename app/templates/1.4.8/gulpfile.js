var gulp = require('gulp');
var kmc = require('gulp-kmc');
var less = require('gulp-less');
var css = require('gulp-mini-css');
var kclean = require('gulp-kclean');
var rename = require("gulp-rename");
var filter = require('gulp-filter');
var minify = require('gulp-minify');
var XTemplate = require('xtemplate');
var gulpXTemplate = require('gulp-xtemplate');
var src = "./src",
    dest = "./build";

//包配置
var pkg = "<%=name%>";
var comboSuffix = '-combo';

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
            kissy: true,
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
        .pipe(minify())
        .pipe(filter(function(file){
            return [fileName+comboSuffix+'.js'].indexOf(file.relative) == -1;
        })).pipe(rename(function(file){
            file.basename = file.basename.replace(fileName+comboSuffix+'-min',fileName+'-min');
        }))
        .pipe(gulp.dest(dest));
}

gulp.task('kmc',['xtpl'], function() {
    //处理index.js
    return renderKmc('index');
});

gulp.task('css', function(){
    gulp.src(src+'/*.less')
        .pipe(less())
        .pipe(gulp.dest(dest))
        .pipe(filter('**/*.css'))
        .pipe(css({ext:'-min.css'}))
        .pipe(gulp.dest(dest));
});

gulp.task('xtpl',function(){
    return gulp.src(src+'/**/*.xtpl')
        .pipe(gulpXTemplate({
            wrap: 'kissy',
            XTemplate: XTemplate
        }))
        .pipe(gulp.dest(src));
});

gulp.task('watch', function() {
    gulp.watch(src+'/**/*.js', ['kmc']);
    gulp.watch(src+'/**/*.xtpl', ['xtpl']);
    gulp.watch(src+'/**/*.less', ['css']);
});

gulp.task('default', ['kmc','css']);