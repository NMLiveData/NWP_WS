var mongoose = require('mongoose');
var Pohotograph = require('../model/photograph');
var Session = require('../model/session');



exports.addPhoto =function(req, res){
    
    var PohotographObject = {
        id:req.body.id,
        name:req.body.name,
        story:req.body.story,
        imgURL:req.body.imgURL,
        relatedPhotos:req.body.related,
        objectList:req.body.objectList
    }

    Pohotograph.create(PohotographObject, function(err,data){

        if(err){
            console.log("error - invalid ID");
            res.json({success:false, message:err});
            return;
        }

        var date = new Date();
        var SessionObject = {
            photoID:req.body.id,
            appEntranceCounter:0,
            currentViewers:0,
            currentLightning:50,
            accumulateViewersPerDay:0,
            lastUpdate:"0",
            accumulateSinceStart:[
                {
                    "date": date.toDateString(),
                    "totalApp": 0,
                    "totalViewers": 0
                }
            ]
        }

        Session.create(SessionObject, function(err,data){
            if(err){
                console.log("fail to create session: " + err);
                res.json({success:false, message:"fail to create session: " + err});
                return 0;
            }
        });

        console.log("success create new Pohotograph & session");
        res.json({success:true, message:data});
        return;

    });
}



exports.getPohotoInfo = function(req, res){

    var id = req.body.id;   
    console.log(id);

    Pohotograph.findOne({id:id},{_id:0, __v:0}).
        exec(function(err, doc){
            if(err){
                console.log("error: " + err);
                return 0;
             }  
            incrementAppEntrance(id);               
            console.log("find photo:" + JSON.stringify(doc));
            res.json(doc);
            return;
         });
}



exports.deletePohoto = function(req, res){

    var id = req.body.id;   
    console.log(id);

    Pohotograph.findOne({id:id}).
        exec(function(err, doc){
            doc.remove(function(err, deletedDoc){
                if(err){
                console.log("error: " + err);
                return 0;
                }

                Session.findOne({photoID:id}).
                    exec(function(err, doc){
                        doc.remove(function(err, deletedDoc){
                            if(err){
                            console.log("error: " + err);
                            return 0;
                        }
                        //console.log("deleted session:" + JSON.stringify(deletedDoc));
                    });
                }); 

                console.log("deleted photo:" + JSON.stringify(deletedDoc));
                res.json(deletedDoc);

            });
         });

}


function incrementAppEntrance =function(id){

    // var id = req.body.id;   
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


/*exports.updatePohotograph =function(req, res){
    
    var PohotographObject = {
        id:req.body.id,
        name:req.body.name,
        story:req.body.story,
        imgURL:req.body.imgURL,
        relatedPhotos:req.body.related,
        objectList:req.body.objectList
    }

    Pohotograph.create(PohotographObject, function(err,data){
        if(err){
            console.log("error");
            res.json({success:false, message:err});
            return;
        }
        else{

            console.log("success create new Pohotograph");
            res.json({success:true, message:data});
            return;
        }
    });
}*/


