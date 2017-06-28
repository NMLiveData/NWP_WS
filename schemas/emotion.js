var mongoose = require('mongoose');
var schema = mongoose.Schema;
var emotionsSchema = new schema({
    id:{type: Number},
    name: {type: String},
    measure:{type: Number}
}, {collection: 'emotions'});

//validation with DB
var Emotion = mongoose.model('Emotion', emotionsSchema);

module.exports = Emotion;