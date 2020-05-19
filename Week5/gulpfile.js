const gulp = require('gulp');
const $ = require('gulp-load-plugins')()
/*after installing gulp-load-plugins, all package name with prefix, gulp, can be trigger by using '$'*/
const autoprefixer = require('autoprefixer');

/*don't forget return*/
gulp.task('jade', ()=>{
  return gulp.src('./source/**/*.jade')
    .pipe($.plumber())
    .pipe($.jade({
      pretty:true //with full tags
    }))
    .pipe(gulp.dest('./public/'))
});

gulp.task('sass', ()=>{
  return gulp.src('./source/scss/**/*.scss')
    .pipe($.plumber())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.postcss([autoprefixer()]))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('babel', () =>{
  return gulp.src('./source/js/**/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.babel({
      presets: ['@babel/env']
    }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/js'))
});

gulp.task('imgCompress', ()=>{
  return gulp.src('./source/images/*')
        .pipe($.imagemin())
        .pipe(gulp.dest('./public/images'))
})

/*watch your files*/
gulp.task('watch', ()=>{
  gulp.watch('./source/**/*.jade', gulp.series('jade'));
  gulp.watch('./source/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('./source/js/**/*.js',gulp.series('babel'))
});

/*task lists by follows*/
gulp.task('default', gulp.series('jade', 'sass', 'babel','imgCompress','watch'));