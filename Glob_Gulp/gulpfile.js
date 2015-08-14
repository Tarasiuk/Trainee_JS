var gulp = require('gulp');
var requireDir = require('require-dir');
var glob = require("glob");
var argv = require("yargs").argv;
var rename = require("gulp-rename");

requireDir('./', { recurse: true });

gulp.task('default', function() {
    gulp.run('parseFolders');
});

