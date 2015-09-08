(function (data) {
    var seedData = require("./seedData");
    var database = require("./database");

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

    data.get_all_session = function (session_id, next) {
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
                db.sessions.insert(session, function (err, result) {
                    if (err) {
                        next(err);
                    } else {
                        next(null, result[0]);
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
                db.sessions.delete({ id: session_id }, next);
            }
        });
    };

})(module.exports);