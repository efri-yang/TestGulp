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

//********sass 
gulp.task('sass', function() {  
    return sass('Test/sass/**/*.scss',{ sourcemap: true})
        .pipe(plumber({errorHandler: notify.onError('错误: <%= error.message %>')}))
        .pipe(sourcemaps.write())
        .pipe(sourcemaps.write('maps', {
              includeContent: false,
              sourceRoot: 'source'
         }))
        .pipe(gulp.dest('Test/css/'))
        .pipe(filter('**/*.css')) // Filtering stream to only css files
        .pipe(browserSync.reload({stream:true}));// Write the CSS & Source maps
});

//********图片 
gulp.task("imagemin",function(){
    gulp.src("Test/images/*.{png,jpg,gif,ico}")
            .pipe(cache(imagemin({
                optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
                progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
                interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
                multipass: true, //类型：Boolean 默认：false 多次优化svg直到完全优化
                svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
                use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
            })))
            .pipe(gulp.dest('Test/img'))
            .pipe(browserSync.reload({stream:true}));
})


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
 * 插件名：gulp-copy
 * 配合插件：——       
 */
gulp.task("cleanDist",function(){
    del('Dist/**',{dryRun: false})
});
gulp.task('copy',['cleanDist'],function(){
    gulp.src("Test/images/**")
            .pipe(rename({dirname: ''}))  
            .pipe(gulp.dest("Dist/images"));  
});

//********serve 
gulp.task("serve",["sass","imagemin"],function(){
    browserSync.init({
        server:{
            baseDir:"./Test/",
            directory:true
        }
    });
    gulp.watch("Test/sass/*.scss",["sass"]);
    gulp.watch("Test/images/*.{png,jpg,gif,ico}",["imagemin"]);
    gulp.watch("Test/*.html",reload); 
})







gulp.task('default', ['serve']);

/**
 * 启动服务器
 * 检测文件(仅仅是改变的文件)
 */
