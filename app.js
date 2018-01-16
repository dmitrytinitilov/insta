const util = require('util');

var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());
app.use(express.static('public'));

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var multer  = require('multer')
var upload = multer({ dest: 'public/uploads/' })
var fs = require('fs');

app.set('view engine','pug');

app.get('/',function(req,res) {

	res.end('server for uploading your files');

})

app.get('/pictures',function(req,res){
	fs.readdir('./public/uploads', (err, files) => {

	  if (!err){
	  	res.render('pictures.pug',{files:files});	  	
	  } else {
	  	console.log('error '+err);
	  	res.end('We got some error!');
	  }
	})
})

app.get('/api/pictures',function(req,res){
	fs.readdir('./public/uploads', (err, files) => {

	  if (!err){
	  	res.end(JSON.stringify(files));
	  } else {
	  	console.log('error '+err);
	  	res.end('We got some error!');
	  }
	})
})

var server = app.listen(8080,function(){

	console.log('Server got the power');

})