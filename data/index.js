(function(data){
	var seedData = require("./seedData");
    var database = require("./database");

    data.get_author = function() {
        return seedData.author;
    };
    
    data.get_providers = function() {
        return seedData.providers;
    };

    data.get_session = function(session_id, next) {
        database.getDb(function(err, db) {
            if(err){
                next(err);
            }else{
                db.sessions.findOne({id: session_id}, next);
            }
        });
    };

})(module.exports);