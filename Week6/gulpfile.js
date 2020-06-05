const gulp = require('gulp');
const $ = require('gulp-load-plugins')()
/*after installing gulp-load-plugins, all package name with prefix, gulp, can be trigger by using '$'*/
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const minimist = require('minimist');

/*setting default environment option*/
const envOptions = {
  string:'env',
  default:{env:'dev'}
}
const options = minimist(process.argv.slice(2),envOptions)

/*don't forget return*/
gulp.task('clean', ()=>{
  return gulp.src(['./temp/','./public'],{allowEmpty:true,read:false})
             .pipe($.clean())
})

gulp.task('templateHTML', () => {
  return gulp.src('./source/**/*.html')
    .pipe($.plumber())
    .pipe($.templateHtml('./source/layout.html'))
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.stream())
})

gulp.task('sass', ()=>{
  return gulp.src([
      '../node_modules/bootstrap/scss/bootstrap.scss',
      './source/scss/**/*.scss'
    ])
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.postcss([autoprefixer()]))
    .pipe($.concat('all.css'))
    .pipe($.if(options.env === "production",$.cleanCss()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream())
});

gulp.task('babel', () =>{
  return gulp.src([
      '../node_modules/jquery/dist/jquery.min.js',
      '../node_modules/popper.js',
      '../node_modules/bootstrap/dist/js/bootstrap.min.js',
    ])
    .pipe($.sourcemaps.init())
    .pipe($.babel({
      presets: ['@babel/env']
    }))
    .pipe($.concat('third-party.js'))
    .pipe($.if(options.env ==="production",$.uglify()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.stream())
});

gulp.task('babel-custom', () => {
  return gulp.src([
    './source/js/**/*.js'
  ])
    .pipe($.babel({
      presets: ['@babel/env']
    }))
    .pipe($.if(options.env === "production", $.uglify()))
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.stream())
});

gulp.task('imgCompress', () => {
  return gulp.src('./source/images/*')
    .pipe($.imagemin())
    .pipe(gulp.dest('./public/images'))
})

// Static server
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./public"
    }
  });
});

/*watch your files*/
gulp.task('watch', ()=>{
  gulp.watch('./source/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('./source/js/**/*.js',gulp.series('babel'));
  gulp.watch('./source/**/*.html', gulp.series('templateHTML'));
});

/*task lists by follows*/
/*watch and browser-sync should run parallel*/
gulp.task('default', gulp.series('clean', gulp.parallel('templateHTML', 'sass', 'babel','babel-custom', 'imgCompress'), gulp.parallel('watch', 'browser-sync')));


gulp.task('build', gulp.series('clean', gulp.parallel('templateHTML', 'sass', 'babel','babel-custom', 'imgCompress')));