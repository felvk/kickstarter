var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var prefix = require('gulp-autoprefixer');
var compass = require('gulp-compass');
var svg2png = require('gulp-svg2png');
var cssmin = require('gulp-cssmin');


var paths = {
  scripts: ['./js/*.js', './js/**/*.js'],
  vendorscripts: ['./js/vendor/*.js', './js/bootstrap/*.js'],
  images: ['./img/*'],
  styles: './css/*.css',
  sass: './sass/*.scss'
};


gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('./build/js'));
});

// 
gulp.task('vendorscripts', function() {
  return gulp.src(paths.vendorscripts)
    .pipe(uglify())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./js'));
});

gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(cssmin())
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('prefix', function() {
  gulp.src('./css/*.css')
    .pipe(prefix(["last 1 version", "> 1%", "ie 8"], { cascade: true }))
    .pipe(gulp.dest('./css'));
});

gulp.task('compass', function() {
  return gulp.src(paths.sass)
    .pipe(compass({
      config_file: './config.rb',
      css: 'css',
      sass: 'sass'
    }))
    .pipe(gulp.dest('./css'));
});

gulp.task('images', function() {
 return gulp.src(paths.images)
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('./build/img'));
});

gulp.task('svg2png', function () {
  return gulp.src(['./img/*.svg', './img/**/*.svg'])
        .pipe(svg2png())
        .pipe(gulp.dest('./build/img/converted-svg'));
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['compass']);
  gulp.watch(paths.styles, ['prefix']);
});


gulp.task('default', ['scripts', 'vendorscripts', 'compass', 'prefix', 'styles', 'images', 'svg2png', 'watch']);

