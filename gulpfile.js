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
        .pipe(plumber({errorHandler: notify.onError('错误: <%= error.message %>')}))
        .pipe(sourcemaps.write())
        .pipe(sourcemaps.write('maps', {
              includeContent: false,
              sourceRoot: 'source'
         }))
        .pipe(rename(function (path) {
        
            return path;
          }))
        .pipe(gulp.dest(paths.tmp))
        // .pipe(filter('**/*.css')) // Filtering stream to only css files
        .pipe(browserSync.reload({stream:true}));// Write the CSS & Source maps
       
});

gulp.task('html', function() {  
    gulp.src(paths.src+'/**/*.html')
        .pipe(gulp.dest(paths.tmp))
        .pipe(browserSync.reload({stream:true}));// Write the CSS & Source maps
       
});


gulp.task("serve",["sass","html"],function(){
    browserSync.init({
        server:{
            baseDir:".tmp/",
            directory:true
        }
    });
    gulp.watch([paths.src+'/**/*.scss'],["sass"]);
    gulp.watch(paths.src+'/**/*.html',["html"]);
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
            .pipe(gulp.dest('Dist/images'))
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

gulp.task('one',function(cb){
  var stream = gulp.src('Test/*.html')
      .pipe(gulp.dest('build'));
      console.dir("one is  done")
    return stream;
});



gulp.task('two',['one'],function(){
    console.log('two is done');
});
gulp.task("cleanDist",function(cb){
    del(['Dist/**',"!Dist"],cb());

    
});
function errrHandler(e){
    // 控制台发声,错误时beep一下
    gutil.beep();
    gutil.log(e);
}
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
gulp.task('test4',["testing"],function(){
    console.dir("test4");
});




gulp.task('all', ['one', 'two']); //先输出two 然后输出one


//********file include
gulp.task("fileInclude",function(){
    gulp.src(['include/*.html'])
            .pipe(fileInclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest("Dist"));
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







gulp.task('default', ['serve']);

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
