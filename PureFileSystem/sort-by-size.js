var filesystem = require("fs-extra");

function main() {
    var files = getAllFilesFromFolder(process.argv[2]);
    var middle = divideIntoCategories(files);

    console.log("Big files are bigger then " + (middle >> 10) + "Kb");

    filesystem.ensureDir('.\\Images\\big');
    filesystem.ensureDir('.\\Images\\small');

    files.forEach(function (file) {
        var stat = filesystem.statSync(file);

        if (stat.size > middle) {
            filesystem.copy(file,".\\Images\\big\\" + stat.size + ".jpg", function (err, data) {
                if (err) throw err;
            });
        }
        else {
            filesystem.copy(file,".\\Images\\small\\" + stat.size + ".jpg", function (err, data) {
                if (err) { throw err; }
            });
        }
    });

    console.log("Operation completed");
}

function getAllFilesFromFolder(dir) {

    var results = [];

    filesystem.readdirSync(dir).forEach(function (file) {

        if (/[^.]+$/.exec(file) == "jpg") {
            file = dir + '/' + file;

            var stat = filesystem.statSync(file);

            if (stat && stat.isDirectory()) {
                results = results.concat(getAllFilesFromFolder(file))
            } else results.push(file);
        }
    });

    console.log(results.length +
        " images found in folder");

    return results;
};

function divideIntoCategories(files) {

    var sizes = [];

    files.forEach(function (file) {
        var stat = filesystem.statSync(file);
        sizes.push(stat.size);
    });

    var max = Math.max.apply(Math, sizes);
    console.log("Maximum file size: " + (max >> 10) + "Kb");
    var min = Math.min.apply(Math, sizes);
    console.log("Minimum file size: " + (min >> 10) + "Kb");
    return (max - min) / 2;
}

main();

