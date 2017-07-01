'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cloudinary = require('cloudinary');
var cors = require('cors');
var app = express();//create app obj - http server
var port = process.env.PORT || 3000;


app.use('/images',express.static('/public/images'));
app.use(cors());
app.use(bodyParser.json());//enable to return jsons
app.use(bodyParser.urlencoded({extended:false}));
app.enable('trust proxy');//equivalent to app.set('trust proxy', true)
app.set('port', port);


app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.set("Content-Type", "Application/json");
	next();
});
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something Broke!');
}); 




/* ====== MODULS ======
   ==================== */

var photoAction = require('./mdls/photograph.js');
var sessionAction = require('./mdls/session.js');
var systemAction = require('./mdls/system.js');


/* ====== ROUTES ======
   ==================== */

app.post('/addPhoto', photoAction.addPhoto);
app.post('/getPhotoInfo', photoAction.getPohotoInfo);
app.post('/deletePhoto', photoAction.deletePohoto);

//--

app.post('/incrementAppEntrance', sessionAction.incrementAppEntrance);
app.post('/currentViewers', sessionAction.getAllCurrentViewers);
app.post('/currentLightning', sessionAction.getAllCurrentLightning);
app.post('/totalViewes', sessionAction.getTotalViewes);

//--

app.post('/calibration', systemAction.systemCalibration);

//--

app.get('/', function (req, res) { 
    res.status(200).json({message:"NWT_ws App is running!"}); 
});

app.listen(port);
console.log("service is listening on port: " + port);




































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