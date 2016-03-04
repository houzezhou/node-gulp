//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less');
    concat = require('gulp-concat');
    uglify = require('gulp-uglify');
    imagemin = require('gulp-imagemin');
    pngquant = require('imagemin-pngquant');
    cssmin = require('gulp-minify-css');

//定义一个testLess任务（自定义任务名称）
gulp.task('testLess', function () {
    gulp.src('src/less/index.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest('src/css')); //将会在src/css下生成index.css
});

//合并js
gulp.task('testConcat', function () {
    gulp.src('src/js/*.js')
        .pipe(concat('all.js'))//合并后的文件名
        .pipe(gulp.dest('dist/js'));
});

//压缩js
gulp.task('jsmin', function () {
   gulp.src(['src/js/index.js','src/js/test.js'])//多个文件以数组形式传入
       .pipe(uglify())
       .pipe(gulp.dest('dist/jsUglify'));
});

//压缩css
gulp.task('testCssmin', function () {
    gulp.src('src/css/*.css')
        .pipe(cssmin({
            advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true//类型：Boolean 默认：false [是否保留换行]
        }))
        .pipe(gulp.dest('dist/css'));
});

//压缩图片
gulp.task('testImagemin', function () {
    gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 1, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
            use: [pngquant({quality: '45-60'})] //使用pngquant深度压缩png图片的imagemin插件
        }))
        .pipe(gulp.dest('src/img'));
});

//监测代码 一旦变化 就执行某个task
gulp.task('watch',function(){
    gulp.watch('src/js/*.js', ['jsmin']);
    gulp.watch('src/css/*.css', ['testCssmin']);
});

gulp.task('default',['testLess','testConcat','jsmin','testImagemin']); //定义默认任务

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径

