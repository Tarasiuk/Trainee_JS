var gulp = require('gulp'),
    glob = require("glob"),
    rename = require("gulp-rename"),
    fs = require("fs-extra"),
    tap = require("gulp-tap"),
    moment = require('moment'),
    exif = require('gulp-exif'),
    _ = require('lodash'),
    sorted = './Sorted';

gulp.task('parseFolders', function(){
    var count = 1;

    return gulp.src(
        './Test/**/*.jpg'
    )
    .pipe(exif())
    .pipe(tap(function (file,t) {
        if(file.exif.exif.CreateDate) {
            file.statDate = file.exif.exif.CreateDate;
        } else {
            file.statDate = fs.statSync(file.path).mtime;
        }

        if (moment(file.statDate).isValid()) {
            file.statDate = moment(file.statDate).format("DDMMYYYY");
        } else {
            file.statDate = moment(file.statDate, 'YYYY:MM:DD HH:mm:SS');
            file.statDate = moment(file.statDate).format("DDMMYYYY");
        }

        console.log(count);
        console.log(file.path);
    }))
    .pipe(tap(function (file,t) {
        file.zeroes = ( _.padLeft( (count++).toString(), 8, '0'));

        return gulp.src (file.path)
        .pipe(rename(function (path) {
            path.basename =  file.zeroes + "_" + file.statDate + "_" + path.basename;
        }))
        .pipe(gulp.dest(sorted));
    }))
});
