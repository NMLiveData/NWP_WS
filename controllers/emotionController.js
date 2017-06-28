var mongoose = require('mongoose');
var Emotion = require('../schemas/emotion');



exports.getAll =function(req, res){
    var query = Emotion.find({id:1},{_id:0, __v:0}).
    exec(function(err, docs){
        console.log("docs:" + docs);
        res.json(docs);
        return;
    });
}