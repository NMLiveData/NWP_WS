var mongoose = require('mongoose');
var Pohotograph = require('../model/photograph');
var Session = require('../model/session');


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
               //add the current viewers to total per day
              // updateAccumulateViewersPerDay(docs);
               console.log("Current Viewers: " + docs);
               res.json(docs);
               return;
            }
        });
}


exports.getAllCurrentLightning =function(req, res){

    var sort = { photoID: 1 };

	Session.find({},{photoID:1, currentLightning:1, currentViewers:1, _id:0}).
        sort(sort).
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


/***** General Function *****/

function updateAccumulateViewersPerDay(current){

    var records, len, i=0;

    records = current;
    len = current.length;

    while(i<len){
       Session.update({"photoID":records[i]["photoID"]},
                      { $inc: {"accumulateViewersPerDay":records[i]["currentViewers"]}}).
                        exec(function(err,resulte){});

            i++;
    }
}