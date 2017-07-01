var mongoose = require('mongoose');
var Session = require('../model/session');


exports.systemCalibration =function(req, res){

	var records, len, arr,
		totalApp, totalViewers, i=0, 
		date = new Date().toDateString();


	Session.find({},{photoID:1, appEntranceCounter:1, 
	    			 accumulateViewersPerDay:1, _id:0}).
        exec(function(err, docs){
            if(err){
                console.log("error: " + err);
                return 0;
            }

            len = docs.length;                 
            records = docs;


            //save the current day info by adding new data record to each photo
            while(i<len){

            	totalApp = records[i]["appEntranceCounter"];
            	totalViewers = records[i]["accumulateViewersPerDay"];
            	arr = [{totalApp:totalApp, totalViewers:totalViewers, date:date}];

            	Session.update({"photoID":records[i]["photoID"]},
            				   {
            				   		$addToSet:{
            				   			accumulateSinceStart:{$each:arr}}
            				   	 
            				   }).exec(function(err,resulte){});
            	i++;
            }

            i=0;
            // zeroing the fields "appEntranceCounter" AND "accumulateViewersPerDay"
            while(i<len){

            	Session.update({"photoID":records[i]["photoID"]},
            				   {
            				   		$set:{
            				   			"appEntranceCounter":0,
            				   			"accumulateViewersPerDay":0
            				   		}
            				   	 
            				   }).exec(function(err,resulte){});
            	i++;
            }

        });

    console.log("Calibration Succeed!");
}