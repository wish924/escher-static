var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var uglify = require('gulp-uglify');
var fileinclude = require('gulp-file-include');
var jshint = require('gulp-jshint');
var replace = require('gulp-replace');
var rev = require('gulp-rev');
var revDel = require('rev-del');
var revReplace = require("gulp-rev-replace");
var gulpSequence = require('gulp-sequence');
var gulpCopy = require('gulp-copy');

var SRC = 'src';
var DEST = 'dist';
var STATIC_SERVER = '/';

var RELEASE = 'release';
var RELEASE_STATIC_SERVER = 'http://static.eschervr.com/';

gulp.task('less', function() {
    return gulp.src([SRC + '/static/css/**/*.less', '!' + SRC + '/static/css/**/includes/**'])
    .pipe(less())
    .pipe(autoprefixer({
        browsers: ["last 5 versions", "> 5%"]
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest(DEST + '/static/css'));
});

gulp.task('js', function() {
    return gulp.src(SRC + '/static/js/**/*.js')
    .pipe(changed(DEST + '/static/js'))
    .pipe(jshint())
    .pipe(uglify({
        compress: {
            drop_console: false
        }
    }))
    .pipe(gulp.dest(DEST + '/static/js'));
});

gulp.task('jshint', function() {
    return gulp.src(SRC + '/static/js/**/*.js').pipe(jshint());
});

gulp.task('imagemin', function() {
    return gulp.src(SRC + '/static/img/**/*.{png,gif,jpg,jpeg}')
    .pipe(changed(DEST + '/static/img'))
    .pipe(imagemin())
    .pipe(gulp.dest(DEST + '/static/img'));
});

gulp.task('video', function() {
    return gulp.src(SRC + '/static/video/**/*.{mp4,webm}')
    .pipe(changed(DEST + '/static/video'))
    .pipe(gulpCopy(DEST + '/static/video', {prefix: 3}));
});

gulp.task('html', function() {
    return gulp.src([SRC + '/html/**/*.html', '!' + SRC + '/html/**/includes/**'])
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(replace(/"\/(img|js|css)\//g, '"' + STATIC_SERVER + '$1/'))
    .pipe(gulp.dest(DEST + '/html'));
});

gulp.task('watch', function() {
    var html_watcher = gulp.watch(SRC + '/html/**/*.html', ['html']);
    html_watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    var less_watcher = gulp.watch(SRC + '/static/css/**/*.less', ['less']);
    less_watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    var js_watcher = gulp.watch(SRC + '/static/js/**/*.js', ['js']);
    js_watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    var img_watcher = gulp.watch(SRC + '/static/img/**/*.{png,gif,jpg,jpeg}', ['imagemin']);
    img_watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });

    var video_watcher = gulp.watch(SRC + '/static/video/**/*.{mp4}', ['video']);
    img_watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('css-release', function() {
    return gulp.src([SRC + '/static/css/**/*.less', '!' + SRC + '/static/css/**/includes/**'])
    .pipe(changed(RELEASE + '/static/css'))
    .pipe(less())
    .pipe(autoprefixer({
        browsers: ["last 5 versions", "> 5%"]
    }))
    .pipe(cleanCSS())
    .pipe(rev())
    .pipe(gulp.dest(RELEASE + '/static/css'))
    .pipe(rev.manifest())
    .pipe(revDel({dest: RELEASE + '/static/css'}))
    .pipe(gulp.dest(RELEASE + '/static/css'));
});

gulp.task('js-release', function() {
    return gulp.src(SRC + '/static/js/**/*.js')
    .pipe(changed(RELEASE + '/static/js'))
    .pipe(jshint())
    .pipe(uglify({
        compress: {
            drop_console: true
        }
    }))
    .pipe(rev())
    .pipe(gulp.dest(RELEASE + '/static/js'))
    .pipe(rev.manifest())
    .pipe(revDel({dest: RELEASE + '/static/js'}))
    .pipe(gulp.dest(RELEASE + '/static/js'));
});

gulp.task('html-release', function() {
    var js_manifest = gulp.src(RELEASE + '/static/js/rev-manifest.json');
    var css_manifest = gulp.src(RELEASE + '/static/css/rev-manifest.json');
    return gulp.src([SRC + '/html/**/*.html', '!' + SRC + '/html/**/includes/**'])
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(revReplace({manifest: css_manifest}))
    .pipe(revReplace({manifest: js_manifest}))
    .pipe(replace(/"\/(img|js|css|video)\//g, '"' + RELEASE_STATIC_SERVER + '$1/'))
    .pipe(gulp.dest(RELEASE + '/html'));
});

gulp.task('imgmin-release', function() {
    return gulp.src(SRC + '/static/img/**/*.{png,gif,jpg,jpeg}')
    .pipe(changed(RELEASE + '/static/img'))
    .pipe(imagemin())
    .pipe(gulp.dest(RELEASE + '/static/img'));
});

gulp.task('video-release', function() {
    return gulp.src(SRC + '/static/video/**/*.{mp4,webm}')
    .pipe(changed(RELEASE + '/static/video'))
    .pipe(gulpCopy(RELEASE + '/static/video', {prefix: 3}));
});

gulp.task('release', gulpSequence('css-release', 'js-release', 'html-release', 'imgmin-release', 'video-release'));
