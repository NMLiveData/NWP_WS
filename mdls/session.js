var mongoose = require('mongoose');
var Pohotograph = require('../model/photograph');
var Session = require('../model/session');



exports.incrementAppEntrance =function(req, res){

	var id = req.body.id;   
    console.log(id);

    Session.update(
            {photoID:id},
            { $inc: {"appEntranceCounter":1}}).
            exec(function(err, res2){
                if(err){
                    console.log("error: " + err);
                    return 0;
                }
                console.log("find photo:" + JSON.stringify(res2));
                res.json(res2);
                return;
            });

}


exports.getAllCurrentViewers =function(req, res){

    var sort = { photoID: 1 };

	Session.find({},{photoID:1, currentViewers:1, _id:0}).
    sort(sort).
    exec(function(err, docs){
        if(err){
            console.log("error: " + err);
            return 0;
        }                 
        else{
           console.log("Current Viewers: " + docs);
           res.json(docs);
           return;
        }
    });
}


exports.getAllCurrentLightning =function(req, res){

	Session.find({},{photoID:1, currentLightning:1, _id:0}).
    exec(function(err, docs){
        if(err){
            console.log("error: " + err);
            return 0;
        }                 
        else{
           console.log("Current Lightning: " + docs);
           res.json(docs);
           return;
        }
    });
}


exports.getTotalViewes =function(req, res){

    var id = req.body.id;   
    console.log(id);

	Session.findOne({photoID:id},{photoID:1,appEntranceCounter:1,
					 currentViewers:1, accumulateSinceStart:1, _id:0}).
    exec(function(err, docs){
        if(err){
            console.log("error: " + err);
            return 0;
        }

        /* ..... upcoming ..... */                
        
        console.log("Total Viewes: " + docs);
        res.json(docs);
        return;
        
    });
}