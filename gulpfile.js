var gulp = require("gulp");
var sass = require("gulp-ruby-sass");
var imagemin = require("gulp-imagemin");
var sourcemaps = require("gulp-sourcemaps");
var pngquant = require('imagemin-pngquant');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var filter      = require('gulp-filter');
var watch=require("gulp-watch");
var cache = require('gulp-cached');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var del=require("del");
var rename = require('gulp-rename');
var fileInclude =require("gulp-file-include");
var wrench=require("wrench");
var autoPrefixer=require("gulp-autoprefixer");
var cleanCSS=require("gulp-clean-css");
var gulpUtil = require('gulp-util');
var runSequence = require('run-sequence');




var paths = {
  src: 'src',
  dist: 'dist',
  tmp: '.tmp'
};


// wrench.readdirSyncRecursive('./gulp').filter(function(file) {
//     return (/\.(js|coffee)$/i).test(file);
// }).map(function(file) {
//     require('./gulp/' + file);
// });


// var path=require("path")

// gulp.task("see",function(){
//     gulp.src([])
// })
//********sass

gulp.task('sass', function() {  
    return sass(paths.src+'/**/*.scss',{ sourcemap: true})
        .pipe(cache("cached"))
        .on('error',errorHanding("sass"))
        .pipe(sourcemaps.write('maps', {
              includeContent: false,
              sourceRoot: 'source'
         }))
        .pipe(gulp.dest(paths.tmp))
        .pipe(browserSync.reload({stream:true}));// Write the CSS & Source maps     
});

//异常处理
//依赖插件 gulp-util
function errorHanding(title) {
  'use strict';
  return function(err) {
    gulpUtil.log("错误异常——执行任务"+gulpUtil.colors.magenta('[' + title + ']:\n'),err.message);
    this.emit('end');//不让卡住文档流
  };
};



gulp.task('html', function() {  
    gulp.src([paths.src+'/**/*.html',"!"+paths.src+'/**/_*.html'])
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .on('error',errorHanding("html-build"))
        .pipe(cache())
        // 下面这段原本是用来拷贝过滤文件，但是在sass的时候，却
        // 过滤了_header.html 改变在控制台不输出
        // .pipe(filter(paths.src +'/**/!(_)*.html'))
        .pipe(gulp.dest(paths.tmp))
        .pipe(browserSync.reload({stream:true}));// Write the CSS & Source maps  
       
});



// 要分dist和
gulp.task('clean:tmp',function() {  
    return del([paths.tmp+"/**/*"]);  
});




gulp.task("default",function(){
    runSequence(
        'clean:tmp',
        'html',
        'sass',
        'imagemin',
        function(){
             browserSync.init({
                server:{
                    baseDir:".tmp/",
                    directory:true
                }
            });
            gulp.watch([paths.src+'/**/*.scss'],["sass"]);
            gulp.watch(paths.src+'/**/*.html',["html"]);
            gulp.watch(paths.src+"/**/*.{png,jpg,gif,ico}",["imagemin"]);
            
        }
    );  
});
//********图片 
gulp.task("imagemin",function(){
    gulp.src(paths.src+"/**/*.{png,jpg,gif,ico}")
            .pipe(cache(imagemin({
                optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
                multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
                svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
                use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
            })))
            .pipe(gulp.dest(paths.tmp))
            .pipe(browserSync.reload({stream:true}));
});


/**
 * 任务：删除文件
 * 插件名：del
 * 配合插件：——         
 */
gulp.task("clean",function(){
    del('Test/delTest/**',{force:true,dryRun: false}).then(paths => {
        console.log('删除的文件:\n',paths.join('\n'));
    });;
});

/**
 * 任务：拷贝文件
 * 配合插件：——       
 */

gulp.task('copy',['cleanDist'],function(){
    gulp.src("Test/images/**")
            .pipe(gulp.dest("Dist/images"));  
});





// gulp.task("one",function(cb){
//     setTimeout(function(){
//         console.dir("one task");
//         cb();
//     },2500)
// });
// gulp.task("two",["one"],function(){
//     console.dir("two task");
// });


gulp.task('testing',["cleanDist"],function(cb){
     gulp.src("Test/images/*.{png,jpg,gif,ico}")
            .pipe(cache(imagemin({
                optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
                multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
                svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
                use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
            })))
            .pipe(plumber({errorHandler: notify.onError('错误: <%= error.message %>')}))
            .pipe(gulp.dest('Dist/images'))
            .pipe(browserSync.reload({stream:true}));
         console.log("testing");
         cb();
        
});

//********file include


//********serve 
// gulp.task("serve",["sass","imagemin"],function(){
//     browserSync.init({
//         server:{
//             baseDir:"./Test/",
//             directory:true
//         }
//     });
//     gulp.watch("Test/sass/*.scss",["sass"]);
//     gulp.watch("Test/images/*.{png,jpg,gif,ico}",["imagemin"]);
//     gulp.watch("Test/*.html",reload); 
// });








/**
 * 启动服务器
 * 检测文件(仅仅是改变的文件)
 */



// wrench.readdirSyncRecursive('./gulp').filter(function(file) {
//   return (/\.(js|coffee)$/i).test(file);
// }).map(function(file) {
//    require('./gulp/' + file);
// });


// wrench.copyDirSyncRecursive('./Test/images/', 'Dist', {
//     forceDelete: true, // Whether to overwrite existing directory or not 
//     excludeHiddenUnix: false, // Whether to copy hidden Unix files or not (preceding .) 
//     preserveFiles: false, // If we're overwriting something and the file already exists, keep the existing 
//     preserveTimestamps: false, // Preserve the mtime and atime when copying files 
//     inflateSymlinks: false, // Whether to follow symlinks or not when copying files 
// });
// 
// 
// 
// 



/**
 * 任务——删除 
 * 1、删除
 * 2、html编译
 */
gulp.task('html:dist', function() {  
    gulp.src([paths.src+'/**/*.html',"!"+paths.src+'/**/_*.html'])
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .on('error',errorHanding("html-build"))
        .pipe(cache())
      
        
        
        .pipe(gulp.dest(paths.dist))
        
        .pipe(browserSync.reload({stream:true}));// Write the CSS & Source maps  
      
});

//********图片 
gulp.task("images:dist",function(){
    gulp.src(paths.src+"/**/*.{png,jpg,gif,ico}")
            .pipe(cache(imagemin({
                optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
                multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
                svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
                use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
            })))
            .pipe(gulp.dest(paths.dist))
            .pipe(browserSync.reload({stream:true}));
           
});
//********style
gulp.task('style:dist', function() {      
     return sass(paths.src+'/**/*.scss')
        // .pipe(cache("cached"))
        .pipe(cleanCSS())
        .on('error',errorHanding("sass"))
        .pipe(gulp.dest(paths.dist))
        .pipe(browserSync.reload({stream:true}));// Write the CSS & Source maps        
});


//********style
gulp.task('other:dist', function () {
    gulp.src([paths.src+'/**/*','!'+paths.src+'/**/*.{html,css,js,scss,png,jpg,gif,ico}'])
        .pipe(filter(function (file) {
        return file.stat.isFile();
        }))
        .pipe(gulp.dest(paths.dist));
       
});


gulp.task('clean:dist',function(cb) {  
    return del([paths.dist+"/**/*"]);
});




gulp.task("dist",function(){
    runSequence(
        'clean:dist',
        'html:dist',
        'style:dist',
        'other:dist',
        function(){
             browserSync.init({
                server:{
                    baseDir:"dist/",
                    directory:true
                }
            });
            gulp.watch([paths.src+'/**/*.scss'],["style:dist"]);
            gulp.watch(paths.src+'/**/*.html',["html:dist"]);
            gulp.watch(paths.src+"/**/*.{png,jpg,gif,ico}",["imagemin:dist"]);
            
        }
    );  
});



