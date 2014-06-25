var gulp = require("gulp"),
    jasmine = require("gulp-jasmine"),
    header = require("gulp-header"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    pkg = require("./package.json");

var d = new Date();
var releaseDate = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear()

var fileStack = [
  "src/setup.js",
  "src/resource.js",
  "src/collection.js",
  "src/member.js",
  "src/route.js",
  "src/request.js",
  "src/proxies.js"
];

// var fullStack = [
//   "node_modules/asap/asap.js",
//   "node_modules/promise/core.js",
//   "node_modules/promise/index.js",
// ].concat(fileStack);

var testFiles = [
  "specs/resources_spec.js",
  "specs/proxies_spec.js"
];

var banner = [
  "<%= pkg.banner.divider %>",
  "<%= pkg.banner.project %>",
  "<%= pkg.banner.copyright %>",
  "<%= pkg.banner.license %>",
  "<%= pkg.banner.licenseLink %>",
  "<%= pkg.banner.divider %>",
  "\n// Version: <%= pkg.version %> | From: <%= date %>\n",
  ""].join("\n");

gulp.task("test", function(){
  gulp.src(testFiles)
      .pipe(jasmine());
});

gulp.task("pack", function(){
  gulp.src(fileStack)
      .pipe(concat("vej.js"))
      .pipe(header(banner, { pkg: pkg, date: releaseDate }))
      .pipe(gulp.dest("dist"))
      .pipe(concat("vej.min.js"))
      .pipe(uglify())
      .pipe(gulp.dest("dist"));

  // gulp.src(fullStack)
  //     .pipe(concat("vej-full.js"))
  //     .pipe(gulp.dest("dist"))
});
