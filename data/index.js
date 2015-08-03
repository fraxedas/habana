(function(data){
	var seedData = require("./seedData");
    var database = require("./database");

    data.get_author = function() {
        return seedData.author;
    };

    data.get_app = function(name, next) {
        database.getDb(function(err, db) {
            if(err){
                next(err);
            }else{
                db.apps.findOne({name: name}, next);
            }
        });
    };

})(module.exports);