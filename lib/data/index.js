(function (data) {
    var seedData = require("./seedData");
    var database = require("./database");
    
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

    data.get_author = function () {
        return seedData.author;
    };

    data.get_providers = function () {
        return seedData.providers;
    };

    data.get_session = function (session_id, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.sessions.findOne({ id: session_id }, next);
            }
        });
    };

    data.get_all_session = function (next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.sessions.find({}, next);
            }
        });
    };

    data.insert_session = function (session, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                session.tracking  = tracking();
                db.sessions.insert(session, function (err, result) {
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

    data.update_session = function (session, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.sessions.update({ id: session.id }, session, next);
            }
        });
    };

    data.delete_session = function (session_id, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                db.sessions.remove({ id: session_id }, next);
            }
        });
    };

    data.delete_expired_sessions = function (next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            } else {
                var date = expired_date();
                db.sessions.remove({ $or: [
                    {tracking: {$exists:false}},
                    {'tracking.accessed': { $lt: date }}
                ]}, next);
            }
        });
    };

})(module.exports);