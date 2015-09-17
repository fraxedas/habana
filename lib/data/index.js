(function (data) {
    var seedData = require("./seedData");
    var database = require("./database");
    var uuid = require('node-uuid');

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
                session.id = uuid.v1();
                db.sessions.insert(session, function (err, result) {
                    if (err) {
                        next(err);
                    } else {
                        next(null, result.ops[0]);
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
                var expire_date = new Date();
                expire_date.setHours(expire_date.getHours() - 1);
                db.sessions.remove({ accessed: { $lt: expire_date } }, next);
            }
        });
    };

})(module.exports);