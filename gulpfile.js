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
    flatten         = require('gulp-flatten'),
    browserify      = require('gulp-browserify');


var paths = {
  srcViews          : ['src/views/**/*.html', '!src/views/**/_*.html'],
  buildViews        : ['build/views/**/*.html', '!build/views/**/_*.html'],
  srcScripts        : ['src/scripts/*.js', 'src/scripts/**/*.js'],
  buildScripts      : ['build/scripts/*.js', 'build/scripts/**/*.js'],
  srcImages         : ['src/images/**/*'],
  buildImages       : ['build/images/**/*'],
  buildStyles       : 'build/styles/*.css',
  srcStyles         : 'src/styles/*.scss'
};


gulp.task('default', ['clean'], function() {
    gulp.start('jade','styles', 'scripts', 'images', 'fonts', 'watch', 'themes');
});

// Compile jade templates to html
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


// Process sass files width compass and set vendor prefixes needed for css and minify them
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

// Create stand alone css theme files 
gulp.task('themes', function() {
  return gulp.src(['src/styles/themes/**/*.scss', '!src/styles/themes/**/_*'])
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

// Concat and minify js files
gulp.task('scripts', ['browserify'], function() {
  return gulp.src(['src/scripts/bundle/*.js'])//, 'src/scripts/**/*.js', '!src/scripts/bootstrap/*.js', '!src/scripts/vendor/*.js'])
    //.pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('build/scripts'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('build/scripts'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Enable ability to include js files into other js files
gulp.task('browserify', function() {
  return gulp.src('src/scripts/main.js')
    .pipe(browserify({ insertGlobals: true }))
    .pipe(rename({suffix: '.bundle'}))
    .pipe(gulp.dest('src/scripts/bundle'));
});

// Optimize images and reduce file size
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('build/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Convert SVG to PNG and minifies SVG files
gulp.task('svg2png', function () {
  return gulp.src(['src/images/*.svg', 'src/images/**/*.svg'])
    .pipe(svg2png())
    .pipe(gulp.dest('build/images/converted-svg'))
    .pipe(notify({ message: 'SVG2PNG task complete' }));
});

// Copy all fonts in src to build
gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('build/fonts'))
    .pipe(notify({ message: 'Fonts task complete' }));
});


gulp.task('clean', function() {
  return gulp.src(['build/styles', 'build/scripts', 'build/images'], {read: false})
    .pipe(clean());
});

// Start NodeJS Server
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



