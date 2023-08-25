const { src, dest, watch, parallel, series } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
// const uglify = require("gulp-uglify-es").default;
// const autoprefixer = require("gulp-autoprefixer");
const del = require("del");
const fileinclude = require("gulp-file-include");
const replace = require("gulp-replace");

function html() {
  return src("app/pages/**/*.html")
    .pipe(fileinclude())
    .pipe(dest("app"))
    .pipe(browserSync.stream());
}

function styles() {
  return src("app/scss/style.scss")
    .pipe(scss({ outputStyle: "expanded" }))
    .pipe(replace("-ms-grid", "grid"))
    .pipe(concat("style.css"))
    // .pipe(
    //   autoprefixer({
    //     overrideBrowserslist: ["last 10 version"],
    //     grid: true,
    //   })
    // )
    .pipe(dest("app/css"))
    .pipe(browserSync.stream())
}



function images() {
  return src("app/images/**/*").pipe(dest("dist/images"));
}

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
  });
}

function watching() {
  watch(["app/pages/**/*.html", "app/blocks/**/*.html"], html).on("change", browserSync.reload);
  watch(["app/scss/**/*.scss", "app/blocks/**/*.scss"], styles);
  watch(["app/js/**/*.js"], browserSync.stream());
}

function build() {
  return src([
    'app/*.html',
    'app/css/style.css',
    'app/js/*.js',
    'app/fonts/**/*',
    //'app/favicon.ico'
  ], {base: 'app'})
    .pipe(dest('dist'));
}

function cleanDist() {
  return del("dist");
}

function cleanPages() {
  return del("app/*.html");
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
// exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.cleanPages = cleanPages;
exports.html = html;

exports.build = series(cleanDist, images, build);
exports.default = parallel(
  cleanPages,
  html,
  styles,
//   scripts,
  browsersync,
  watching
);
