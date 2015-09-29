(function(database){
	var mongodb = require("mongodb");

    //local url or heroku
    var mongodbUrl = process.env.MONGOLAB_URI || "mongodb://localhost:27017/habana";

    var theDb = null;

    database.getDb = function(next) {
        if(!theDb){
            //connect to the database
            mongodb.MongoClient.connect(mongodbUrl, function(err, db){
                if(err){
                    next(err, null);
                }else{
                    theDb = {
                        db:db,
                        sessions: db.collection("sessions"),
                        users: db.collection("users"),
                        accounts: db.collection("accounts"),
                        providers: db.collection("providers")                        
                    };
                    next(null, theDb);
                }
            });
        }else{
            next(null, theDb);
        }
    };

})(module.exports);