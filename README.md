multipleFileUploadWithExpressJS
===============================

**Description:** how to upload multiple files and save them with express.js ( node.JS library )

## ___ important key factors ___##

####1. preparing the html to handle file upload properly.####
```html
  <form action="/uploadFiles" method="post" enctype="multipart/form-data">
    <input type="file" multiple="multiple" accept="image/*" name="uploadedImages"/><br/>
    <input type="submit" value="Upload" />
  </form>
```

***multiple*** attribute allow multiple files to be selected from the file browser. Supported in IE10, Firefox, Opera, Chrome, and Safari.    
***accept*** attribute tells the browser what type of files to allow to select by default.    
***name*** attribute with a given value is required for nodeJS to be able to get referenced.
***enctype="multipart/form-data"*** The enctype attribute specifies how the form-data should be encoded when submitting it to the server. The enctype attribute can be used only if method="post"

####2. getting ready for reading the uploaded files####
```javascript
    app.use(express.bodyParser()); // required for accessing req.files object
```

####3. handling the uploaded files #1####
```javascript
    req.files.uploadedImages.forEach(function (element, index, array) {
      fs.readFile(element.path, function (err, data) {
        var newPath = __dirname + "/public/uploadsDirectoryname/" + element.name;
        fs.writeFile(newPath, data, function (err) {
          if(err) {
            console.log(err);
          }
        });
      });
```
