var gulp = require('gulp');
var glob = require("glob");
var util = require("gulp-util");
var argv = require("yargs").argv;
var rename = require("gulp-rename");

gulp.task('parseFolders', function(){
    var count = 0;
   // util.log(count);
    return gulp.src(
        './Test/**/*.jpg'
    ).pipe(rename(function (path) {
            //util.log(count);
            path.basename = count++ +"_" + path.basename;
        }))
    .pipe(gulp.dest("./new"));
});
