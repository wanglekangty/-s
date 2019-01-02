var gulp = require("gulp");
var sass = require("gulp-sass");
var webserver = require("gulp-webserver");
var fs = require("fs");
var path = require("path");
var url = require("url");

// console.log(sass);
gulp.task("sass", function() {
    return gulp.src("srcs/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("srcs/css/"))
});
gulp.task("wacth", function() {
    gulp.watch("srcs/scss/index.scss", gulp.series("sass"));
});

gulp.task("webserver", function() {
    return gulp.src("srcs")
        .pipe(webserver({
            port: 8080,
            open: true,
            livereload: true,
            middleware: function(req, res) {
                var pathname = url.parse(req.url).pathname;
                // if(){

                // }
            }
        }))
});