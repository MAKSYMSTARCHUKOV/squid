const {
  parallel,
  series,
  src
} = require('gulp');

const gulp = require('gulp'),
  watch = require('gulp-watch'),
  prefixer = require('gulp-autoprefixer'),
  uglify = require('gulp-uglify-es').default,
  rigger = require('gulp-rigger'),
  sass = require('gulp-sass'),
  pug = require('gulp-pug'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  sourcemaps = require('gulp-sourcemaps'),
  cssmin = require('gulp-minify-css'),
  rimraf = require('rimraf'),
  browserSync = require("browser-sync"),
  reload = browserSync.reload;

var path = {
  build: {
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    fonts: 'build/css/fonts/'
  },
  src: {
    pug: 'src/**/*.pug',
    html: 'src/*.html',
    js: 'src/js/*.js',
    style: 'src/style/main.scss',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  watch: {
    pug: 'src/**/*.pug',
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/style/**/*.scss',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*'
  },
  clean: './build'
};

const config = {
  server: {
    baseDir: "./build"
  },
  tunnel: true,
  host: 'localhost',
  port: 3000,
  logPrefix: "Frontend_Wind"
};

gulp.task('html:build', function (cb) {
  gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({
      stream: true
    }));
  cb();
});

gulp.task('pug:build', function (cb) {
  gulp.src(path.src.pug)
    .pipe(rigger())
    .pipe(pug())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({
      stream: true
    }));
  cb();
});

gulp.task('js:build', function (cb) {
  gulp.src(path.src.js, {allowEmpty: true})
    .pipe(rigger())
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({
      stream: true
    }));
  cb();
});

gulp.task('style:build', function (cb) {
  gulp.src(path.src.style, { allowEmpty: true })
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(prefixer())
    .pipe(cssmin())
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({
      stream: true
    }));
  cb();
});

gulp.task('image:build', function (cb) {
  gulp.src(path.src.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins:[{
        removeViewBox: false
      }],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({
      stream: true
    }));
  cb();
});

gulp.task('fonts:build', function (cb) {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
  cb();
});

gulp.task('build',
  parallel(
    'pug:build',
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build')
);

gulp.task('watch', function () {
  watch(path.watch.pug, series('pug:build'));
  watch(path.watch.html, series('html:build'));
  watch(path.watch.style, series('style:build'));
  watch(path.watch.js, series('js:build'));
  watch(path.watch.img, series('image:build'));
  watch(path.watch.fonts, series('fonts:build'));
});

gulp.task('webserver', function (cb) {
  browserSync(config);
  cb()
});

gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

gulp.task('default', series('build', 'webserver', 'watch'));