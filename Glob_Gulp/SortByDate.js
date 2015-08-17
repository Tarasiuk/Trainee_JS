var gulp = require('gulp');
var glob = require("glob");
var rename = require("gulp-rename");
var fs = require("fs-extra");
var tap = require("gulp-tap");
var moment = require('moment');
var exif = require('gulp-exif');

gulp.task('clean', function(){
    fs.removeSync("./Sorted");
});

gulp.task('parseFolders', function(){
    var count = 1,
        statDate,
        zeroes;
    return gulp.src(
        './Test/**/*.jpg'
    )
    .pipe(exif())
    .pipe(tap(function (file,t) {
        if(file.exif.exif.CreateDate) {
            statDate = file.exif.exif.CreateDate;
        }else {
            statDate = fs.statSync(file.path).mtime;
        }
        statDate = moment(statDate).format("DDMMYYYY");

    }))
    .pipe(tap(function (file,t) {
            zeroes = "";
            var countZeroes = 8 - count.toString().length;
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
