const { src, dest, watch, series, parallel } = require('gulp');
const browserSync  = require('browser-sync');
const sass         = require('gulp-sass');
const cleanCSS     = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename       = require("gulp-rename");
const imagemin     = require('gulp-imagemin');
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify');
const newer        = require('gulp-newer');
const del          = require('del');
const fileinclude  = require('gulp-file-include');
const order        = require('gulp-order');
const jquery       = 'node_modules/jquery/dist/jquery.min.js';
const slick        = 'node_modules/slick-carousel/slick/slick.min.js';

function browsersync () {
    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });
}

function style () {
    return src('src/sass/**/*.+(scss|sass)')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('style.min.css'))
        .pipe(dest("dist/css"))
        .pipe(browserSync.stream())
}

function html () {
    return src('src/**/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('dist/'))
}

function scripts () {
    return src([jquery, slick, 'src/JS/**.js'])
    .pipe(concat('all.min.js'))
    .pipe(dest('dist/JS/'))
    .pipe(browserSync.stream())
}

function startWatch () {
    watch(['src/sass/**/*.+(scss|sass)'], style);
    watch(['src/JS/**/*.js', '!src/**/*.min.js'], scripts);
    watch(['src/*.html'], html);
    watch(['src/*.html']).on('change', browserSync.reload);
    watch(['src/images/**/*'], images);
    watch(['src/fonts/**/*'], fonts);
}

function images () {
    return src('src/images/**/*')
        .pipe(newer('dist/images'))
        .pipe(imagemin())
        .pipe(dest('dist/images/'))
}

function cleanImg () {
    return del('dist/images/**/*', {force: true})
}

function fonts () {
    return src('src/fonts/**/*')
        .pipe(dest('dist/fonts/'))
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.style = style;
exports.html = html;
exports.cleanImg = cleanImg;
exports.fonts = fonts;

exports.default = parallel(style, html, scripts, fonts, images, browsersync, startWatch);

