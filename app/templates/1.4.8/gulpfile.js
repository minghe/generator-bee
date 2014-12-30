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
var path = require('path');
var fs = require('fs');
var src = "./src",
    dest = "./build";
var root = process.cwd();
//包配置
var pkg = path.basename(root);
var comboSuffix = '-combo';

kmc.config({
    packages:[{
        name: pkg,
        base: src
    }]
});

kmc.server({
    port:5555,
    fixModule:true,
    path: dest,
    kissy:true
});


var dirs = fs.readdirSync(src);

var kissyFiles = [];
dirs.forEach(function(i){
    var stat = fs.statSync(path.join(src,i));
    //排除非版本号目录
    if(stat.isFile()&&new RegExp(/.*\.js/).test(i)){
        i = i.replace('.js','');
        kissyFiles.push(i);
    }
});

//使用kmc合并并编译kissy模块文件
function renderKmc(fileName){
    var comboFiles = fileName.map(function(name){
        return {
            src: pkg+"/"+name+".js",
            dest: name + comboSuffix+".js"
        };
    });
    var cleanFiles = fileName.map(function(name){
        return {
            src:name+comboSuffix+'.js',
            outputModule:pkg+'/'+name
        };
    });
    return gulp.src([src+'/**/*.js'])
        //转换cmd模块为kissy模块
        .pipe(kmc.convert({
            kissy: true,
            ignoreFiles: ['-min.js']
        }))
        //合并文件
        .pipe(kmc.combo({
            deps:'deps.js',
            files:comboFiles
        }))
        //优化代码
        .pipe(kclean({
            files:cleanFiles
        }))
        .pipe(minify())
        .pipe(filter(function(file){
            var files = fileName.map(function(name){
                return name+comboSuffix+'.js';
            });
            return files.indexOf(file.relative) == -1;
        }))
        .pipe(rename(function(file){
            fileName.forEach(function(name){
                file.basename = file.basename.replace(name+comboSuffix+'-min',name+'-min');
            })
        }))
        .pipe(gulp.dest(dest));
}


gulp.task('kmc', function() {
    return renderKmc(kissyFiles);
});

gulp.task('mini-css', function(){
    return gulp.src([src+'/**/*.css'])
        .pipe(gulp.dest(dest))
        .pipe(css({ext:'-min.css'}))
        .pipe(gulp.dest(dest));
});

gulp.task('less', function(){
    return gulp.src([src+'/**/*.less'])
        .pipe(less())
        .on('error',function(e){
            console.log(e);
        })
        .pipe(gulp.dest(src));
});

gulp.task('css',['less','mini-css']);

gulp.task('xtpl',function(){
    return gulp.src(src+'/**/*.xtpl')
        .pipe(gulpXTemplate({
            wrap: 'kissy',
            XTemplate: XTemplate,
            renderJs: 'none'
        }))
        .on('error',function(e){
            console.log(e);
        })
        .pipe(gulp.dest(src));
});


gulp.task('watch', function() {
    gulp.watch(src+'/**/*.xtpl', ['xtpl']);
    gulp.watch(src+'/**/*.less', ['css']);
});

gulp.task('default', ['kmc','css','watch']);