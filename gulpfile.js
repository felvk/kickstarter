var gulp            = require('gulp'),
    sass            = require('gulp-ruby-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    minifycss       = require('gulp-minify-css'),
    jshint          = require('gulp-jshint'),
    uglify          = require('gulp-uglify'),
    imagemin        = require('gulp-imagemin'),
    rename          = require('gulp-rename'),
    clean           = require('gulp-clean'),
    concat          = require('gulp-concat'),
    notify          = require('gulp-notify'),
    cache           = require('gulp-cache'),
    livereload      = require('gulp-livereload'),
    compass         = require('gulp-compass'),
    jade            = require('gulp-jade'),
    expressService  = require('gulp-express-service'),
    flatten         = require('gulp-flatten');


var paths = {
  src           : 'src',
  build         : 'build',
  scripts       : ['src/scripts/*.js', 'src/scripts/**/*.js'],
  vendorscripts : ['src/scripts/vendor/*.js', 'src/scripts/bootstrap/*.js'],
  images        : ['src/images/**/*'],
  css           : 'src/styles/*.css',
  sass          : 'src/styles/*.scss'
};


gulp.task('default', ['clean'], function() {
    gulp.start('jade','styles', 'scripts', 'images', 'fonts', 'watch', 'themes');
});


gulp.task('jade', function() {
  var YOUR_LOCALS = {};

  return gulp.src(['src/views/**/*.jade', '!src/views/shared'])
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty: true
    }))
    .pipe(gulp.dest('build/views'))
    .pipe(notify({ message: 'Jade task complete' }));
});


gulp.task('styles', function() {
  return gulp.src('src/styles/main.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'build/styles',
      sass: 'src/styles'
    }))
    //.pipe(sass({ style: 'expanded', sourcemap: true, sourcemapPath: 'src/styles' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('build/styles'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('build/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});


gulp.task('themes', function() {
  return gulp.src('src/styles/themes/**/theme.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'build/styles',
      sass: 'src/styles'
    }))
    //.pipe(sass({ style: 'expanded', sourcemap: true, sourcemapPath: 'src/styles' }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(flatten())
    .pipe(gulp.dest('build/styles/themes/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('build/styles/themes/'))
    .pipe(notify({ message: 'Themes task complete' }));
});


gulp.task('scripts', function() {
  return gulp.src(['src/scripts/*.js', 'src/scripts/**/*.js', '!src/scripts/bootstrap/*.js', '!src/scripts/vendor/*.js'])
    //.pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('build/scripts'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('build/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});


gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/images'))
    .pipe(notify({ message: 'Images task complete' }));
});


gulp.task('svg2png', function () {
  return gulp.src(['src/images/*.svg', 'src/images/**/*.svg'])
    .pipe(svg2png())
    .pipe(gulp.dest('build/images/converted-svg'))
    .pipe(notify({ message: 'SVG2PNG task complete' }));
});


gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('build/fonts'))
    .pipe(notify({ message: 'Fonts task complete' }));
});


gulp.task('clean', function() {
  return gulp.src(['build/styles', 'build/scripts', 'build/images'], {read: false})
    .pipe(clean());
});


gulp.task('server', function() {
  return gulp.src('./')
    .pipe(expressService({file:'./server.js', NODE_ENV:'DEV'}));
});


gulp.task('watch', function() {
  // Watch .jade files
  gulp.watch('src/views/**/*.jade', ['jade']);
  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);
  // Watch .js files
  gulp.watch('src/scripts/**/*.js', ['scripts']);
  // Watch image files
  gulp.watch('src/images/**/*', ['images']);
  // Watch font files
  gulp.watch('src/fonts/**/*', ['fonts']);
  // Watch theme files
  gulp.watch('src/styles/themes/**/*.scss', ['themes']);

  // Create LiveReload server
  var server = livereload();
  // Watch any files in build/, reload on change
  gulp.watch(['build/**']).on('change', function(file) {
    server.changed(file.path);
  });
});



