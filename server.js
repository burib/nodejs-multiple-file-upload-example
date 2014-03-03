'use strict';

var express = require('express'),
    http = require('http'),
    app = express(),
    sys = require('sys'),
    fs = require('fs');

app.set('port', process.env.PORT || 1526);
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + '/_tmp' })); // required for accessing req.files object

app.post('/uploadFiles', function (req, res) {
  var newPath = null,
      uploadedFileNames = [];
  if(req.files && req.files.uploadedImages) {
    req.files.uploadedImages.forEach(function (element, index, array) {
      fs.readFile(element.path, function (err, data) {
        newPath = __dirname + "/public/uploads/" + element.name;
        uploadedFileNames.push(element.name);
        fs.writeFile(newPath, data, function (err) {
          if(err) {
            sys.log(err);
          }
        });
        if(index === array.length - 1) {
          res.send({"uploadedFileNames": uploadedFileNames});
        }
      });
    });
  }
});

http.createServer(app).listen(app.get('port'), function () {
  console.log("\n\nNode version: " + process.versions.node);
  console.log("Express server listening on port " + app.get('port') + "\n\n");
});
