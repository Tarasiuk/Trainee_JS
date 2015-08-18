var fs = require("fs-extra"),
    gulp = require('gulp'),
    sorted = './Sorted';

gulp.task('clean', function(){
    fs.removeSync(sorted);
});
/**
 * Created by admin on 17-Aug-15.
 */
