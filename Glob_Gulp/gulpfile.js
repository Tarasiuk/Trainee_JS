var gulp = require('gulp');
var sort = require("./SortByDate.js");
var gutil = require('gulp-util');
var glob = require("glob");
var argv = require("yargs").argv;
var rename = require("gulp-rename");

gulp.task('default', function() {
    gulp.run('parseFolders');
});

gulp.task('parseFolders', function(){
    return gulp.src(
        './Test/**/*.jpg'
    ).pipe(rename(function(path){
                //gutil.log(path.basename);
                //console.log("Hello, I'm working...somehow");
                path.basename += "hello";
                gutil.log(path.basename);
                path.extname = ".jpg";
            }
        ));
});