'use strict';

var express = require('express');
var app = express();//create app obj
var port = process.env.PORT || 8080;




app.enable('trust proxy');//equivalent to app.set('trust proxy', true)
app.set('port', port);
app.use('/',express.static('/public'));
/*app.use(bodyParser.json());//enable to return jsons
app.use(bodyParser.urlencoded({extended:false}));*/
app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.set("Content-Type", "Application/json");
	next();
});
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
}); 


var Emotion= require('./controllers/emotionController.js');


app.get('/getAll' , Emotion.getAll);//ok

//======================= General ==========================
//the get func receives a route and a callback func
 app.get('/', function (req, res) { 
     res.status(200).json({message:"NWT_ws App is running!"}); 
 }); // ------------> connect to login html
app.listen(port);
console.log("service is listening on port " + port);






















/*var http = require('http');

http.createServer(function(req, res){
	res.writeHead(200);
	res.write("we build a server")
	res.end();
}).listen(8080);
console.log('listening on port 8080');
*/

/*app.get('/' , function(req,res){
    res.send("OK");
});
app.listen(port);
console.log('listening..... on port ' + port);

*/