var mongoose = require('mongoose');
var schema = mongoose.Schema;
var photographSchema = new schema({
    id:{type: Number, unique: true, required: true},
    name: {type: String, required: true},
    story:{type: String, required: true},
    imgURL:{type: String, required: true, required: true},
    relatedPhotos:[Number],
    objectList: [{
    		name:String,
    		representation:String												
    }]
}, {collection: 'photographs'});

//validation with DB
var Photograph = mongoose.model('photograph', photographSchema);

module.exports = Photograph;