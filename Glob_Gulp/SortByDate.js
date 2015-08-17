var gulp = require('gulp');
var glob = require("glob");
var util = require("gulp-util");
var argv = require("yargs").argv;
var rename = require("gulp-rename");
var fs = require("fs-extra");
var tap = require("gulp-tap");
var dateFormat = require('dateformat');
var moment = require('moment');

gulp.task('parseFolders', function(){
    var count = 1;
    var statDate;
    var zeroes;
    // util.log(count);
    return gulp.src(
        './Test/**/*.jpg'
    )
    .pipe(tap(function (file,t) {
        statDate = fs.statSync(file.path).mtime;
        statDate = moment(statDate).format("DDMMYYYY");
    }))
    .pipe(tap(function (file,t) {
            zeroes = "";
            var countZeroes = 8 - Math.ceil(count/10);
            for (var i = 0; i < countZeroes; i++)
            {
                zeroes += "0";
            }
        }))
    .pipe(rename(function (path) {
        path.basename = zeroes + count++ + "_" + statDate + "_" +  path.basename;
    }))
    .pipe(gulp.dest("./Sorted"));
});
