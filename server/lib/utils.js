const fs = require('fs');

var flattenObjtoString = function (obj) {
  var colNames = [];
  for (var key in obj) {
    if (key !== 'children') {
      colNames.push(key);
    }
  }
  var rows = '';
  var flatten = function (obj) {
    var currRow = '';
    for (var key in obj) {
      if (key !== 'children') {
        currRow += obj[key] + ',';
      }
    }
    currRow = currRow.substring(0, currRow.length - 1);
    rows += currRow + '\n';
    var childrenArr = obj.children;
    for (var i = 0; i < childrenArr.length; i++) {
      flatten(childrenArr[i]);
    }
  }
  flatten(obj);
  return colNames.join(',') + '\n' + rows;
};

var createCSVFile = (path, string, callback) => {
  fs.writeFile(path, string, function(err, result) {
    if (err) {
      callback(err, null);
    } else  {
      callback(null, result);
    }
  });
};

module.exports = {
  flatten: flattenObjtoString,
  create: createCSVFile
}