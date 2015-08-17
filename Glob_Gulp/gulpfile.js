var gulp = require('gulp');
var requireDir = require('require-dir');
var glob = require("glob");

requireDir('./', { recurse: true });

gulp.task('default', function() {
    gulp.run('clean','parseFolders');
});

