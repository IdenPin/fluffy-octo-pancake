var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var minifyhtml = require('gulp-minify-html');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant'); //png图片压缩插件

//合并
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;


//压缩结构
gulp.task('html',function(){
    gulp.src('./*.html')
        .pipe(minifyhtml())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('./'))
});
//编译压缩样式
gulp.task('style', function () {
    gulp.src('./style/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(minifycss())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(notify({
            message:'sass样式编译已完成！'
        }));
});
//压缩脚本
gulp.task('javascript',function(){
    gulp.src('./script/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
        .pipe(rename({suffix:'.min'}))
        .pipe(concat('build.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(notify({
            message:'js脚本压缩完毕了！'
        }))
});

//压缩图片
gulp.task('image', function () {
     gulp.src('./image/**/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()] //使用pngquant来压缩png图片
        }))
        .pipe(gulp.dest('./dist/img'))
        .pipe(notify({
            message:'图片压缩ok！'
        }))
});

//清除文件
gulp.task('clean',function(){
    gulp.src(['./dist','./*.min.html'])
        .pipe(clean())
        .pipe(notify({
            message:'打扫干净了！'
        }))
});

//watch
gulp.task('watch',function(){
    gulp.watch('./style/**/*.scss',['style']);
    gulp.watch('./script/**/*.js',['javascript']);
});

//启动服务检测
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("*.html").on("change", reload);
    gulp.watch("./dist/**/*.js").on("change", reload);
    gulp.watch("./dist/**/*.scss").on("change", reload);
});

gulp.task('default',['clean','html','style','javascript','image']);