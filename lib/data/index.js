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

    var load = function (id, collection, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.db.collection(collection).findOne({ _id: object_id(id) }, next);
            }
        });
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