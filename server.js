var express = require('express');
var app = express();
const bodyParser = require("body-parser");
var routes = require('./routes/routes')

var port = process.env.PORT || 3000;

// for parsing application/json
app.use(bodyParser.json())

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })) 

app.use(function (req, res, next) {
  console.log(req.path);

  next();
});

app.use("/", require("./routes/routes"));

app.listen(port, function(){
    console.log('Server started on port: ', port);
})