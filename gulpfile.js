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
    gulp.src("specs/*_spec.js")
        .pipe(jasmine());
});

gulp.task("pack", function(){
  var stack = gulp.src(fileStack);
  stack.pipe(concat("vej.js"))
       .pipe(header(banner, { pkg: pkg, date: releaseDate }))
       .pipe(gulp.dest("dist"));
  stack.pipe(concat("vej.min.js"))
       .pipe(uglify())
       .pipe(gulp.dest("dist"));
});
