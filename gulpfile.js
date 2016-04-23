
var gulp = require("gulp");
var wrench=require("wrench");
var runSequence = require('run-sequence');



wrench.readdirSyncRecursive('./gulp').filter(function(file) {
    return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
    require('./gulp/' + file);
});


/**
 * tmp任务
 */


gulp.task("default",function(){
	runSequence('clean',["html","style",'image','script'],'other',"serve");
});




/**
 * dist 任务
 */
gulp.task("dist",function(){
    runSequence('clean-dist',["html-dist","style-dist",'image-dist','script-dist'],'other-dist','serve-dist');
})





