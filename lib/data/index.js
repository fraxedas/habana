(function (data) {
    var seedData = require("./seedData");
    var database = require("./database");
    var ObjectID = require('mongodb').ObjectID;
    
    data.get_author = function () {
        return seedData.author;
    };

    data.get_providers = function () {
        return seedData.providers;
    };

    var expired_date = function () {
        var date = new Date();
        date.setHours(date.getHours() - 1);
        return date;
    };
    
    var tracking = function(){
        var now = new Date();
        return {
            created: now,
            accessed: now
        };
    };
    
    var update_tracking = function(tracking){
        var now = new Date();
        tracking.updated = now;
    };
    
    var object_id = function(id){
        return  ObjectID.createFromHexString(id);
    };
    
    var find = function (expression, collection, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.db.collection(collection).findOne(expression, next);
            }
        });
    };

    var load = function (id, collection, next) {
       find({ _id: object_id(id) }, collection, next);
    };
    
    var all = function (collection, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.db.collection(collection).find({}, next);
            }
        });
    };

    var insert = function (entity, collection, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                entity.tracking  = tracking();
                db.db.collection(collection).insert(entity, function (err, result) {
                    if (err) {
                        next(err);
                    } else {
                        var inserted = result.ops[0];
                        inserted.id = inserted._id.toHexString();
                        next(null, inserted);
                    }
                });
            }
        });
    };
    
    var update = function (entity, collection, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                entity.tracking = update_tracking(entity.tracking);
                db.db.collection(collection).update({ _id: object_id(entity.id) }, entity, next);
            }
        });
    };
    
    var remove = function (expression, collection, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.db.collection(collection).remove(expression, next);
            }
        });
    };

    data.get_session = function (session_id, next) {
        load(session_id, "sessions", next);
    };
    
    data.get_all_session = function (next) {
        all("sessions", next);
    };
    
    
    data.insert_session = function (session, next) {
        insert(session, "sessions", next);
    };
    
    data.get_or_create_user = function (user, next) {
        find({ user_id: user.user_id }, "users", function (err, existing) {
			if (err) {
				next(err);
			}
			else {
				if (existing === null) {
					data.insert_user(user, function (err, persisted) {
						if (err) {
							next(err);
						}
						else {
							next(null, persisted);
						}
					});
				}
			}
		});
    };
    
    data.insert_user = function (user, next) {
        insert(user, "users", next);
    };
    
    data.insert_provider = function (provider, next) {
        data.get_provider(provider.provider_name, function (err, existing){
				if (err) {
					next(err);
				}
				else {
					if (existing) {
						data.delete_provider(provider.provider_name, function (err, session) {
				            if (err) {
                                next(err);
                            }
                            else {
                                insert(provider, "providers", next);
                            }
			             });
					}
					else {
						insert(provider, "providers", next);
					}
				}
			});        
    };
    
    data.get_provider = function (provider_name, next) {
        find({provider_name: provider_name}, "providers", next);
    };
    
    data.delete_provider = function (provider_name, next) {
        remove({provider_name: provider_name}, "providers", next);
    };
    
    data.update_session = function (session, next) {
        update(session, "sessions", next);
    };
    
    data.delete_session = function (session_id, next) {
        remove({ _id: object_id(session_id) }, "sessions", next);
    };
    
    data.delete_expired_sessions = function (next) {  
        var date = expired_date();
        var expression = { $or: [
            {tracking: {$exists:false}},
            {'tracking.accessed': { $lt: date }}
        ]};
        remove(expression, "sessions", next);
    };

})(module.exports);