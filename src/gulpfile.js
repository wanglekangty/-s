var gulp = require("gulp");
var sass = require("gulp-sass");
var webserver = require("gulp-webserver");
var fs = require("fs");
var path = require("path");
var url = require("url");
//压缩
var clean = require("gulp-clean-css");
var uglif = require("gulp-uglify");
var babel = require("gulp-babel");
var html = require("gulp-htmlmin");

// console.log(sass);
gulp.task("sass", function() {
    return gulp.src("srcs/scss/index.scss")
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
                if (pathname === "/favicon.ico") {
                    return res.end();
                }
                if (pathname === "/api/list") {
                    res.end(JSON.stringify({ code: 1, data: "成功" }))
                } else {
                    pathname = pathname === "/" ? "index.html" : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, "srcs", pathname)));
                }
            }
        }))
});
gulp.task("dev", gulp.parallel("sass", "wacth", "webserver"));

//打包到dist下面

//压缩Css
gulp.task("clean", function() {
    return gulp.src("srcs/css/*.css")
        .pipe(clean())
        .pipe(gulp.dest("./dist/css/"))
});
//压缩js
gulp.task("jsa", function() {
    return gulp.src("srcs/js/index.js")
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglif())
        .pipe(gulp.dest("dist/js/"))
});
gulp.task("jsb", function() {
    return gulp.src("srcs/js/libs/*js")
        .pipe(uglif())
        .pipe(gulp.dest("dist/js/libs/"))
});
gulp.task("html", function() {
    return gulp.src("srcs/*.html")
        .pipe(html({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest("dist/"))
});
gulp.task("build", gulp.parallel("clean", "jsa", "jsb", "html"));