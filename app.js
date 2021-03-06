var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
//var router = express.Router();
app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({
	extended: false
}));
//app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname + '/public')));

app.use(require('./routes'));


app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});