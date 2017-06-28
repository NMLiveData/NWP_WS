var mongoose = require('mongoose');
config = {
	mongoUrl:'mongodb://net_photo:net.photo456@ds111771.mlab.com:11771/net_photographs'
};

var options = {
	server: {
	auto_reconnect:true,
	}
};


mongoose.connect(config.mongoUrl, options);
db = mongoose.connection;// global connection variable

db.on('error', function (err) {
	console.log('Mongoose: Error: ' + err);
});

db.on('open', function() {
	console.log('Mongoose: Connection established');
});

db.on('disconnected', function() {
	console.log('Mongoose: Connection stopped, recconect');
	mongoose.connect(config.mongoUrl, options);
});

db.on('reconnected', function () {
	console.info('Mongoose reconnected!');
});

exports.con = mongoose;