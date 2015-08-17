var fs = require("fs-extra");
var gulp = require('gulp');

gulp.task('clean', function(){
    fs.removeSync("./Sorted");
});
/**
 * Created by admin on 17-Aug-15.
 */
