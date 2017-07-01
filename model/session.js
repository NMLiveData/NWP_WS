var mongoose = require('mongoose');
var schema = mongoose.Schema;
var sessionSchema = new schema({
	photoID:Number,
    appEntranceCounter:Number,
    currentViewers:Number,
    currentLightning:Number,
    accumulateViewersPerDay:Number,
    lastUpdate:String,
    accumulateSinceStart:[{
            date:String,
            totalApp:Number,
            totalViewers:Number                                               
    }]
}, {collection: 'sessions'});

//validation with DB
var Session = mongoose.model('Session', sessionSchema);

module.exports = Session;