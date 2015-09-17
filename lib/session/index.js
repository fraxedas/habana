(function (session) {
    var cookies = require("../cookies");
	var data = require("../data");

    session.set = function (res, session, next) {
		if (session) {
			console.log("Setting the session");
			data.insert_session(session, function (err, session) {
				if (err) {
					next(err);
				}
				else {
					cookies.set(res, session.id);
					next();
				}
			});
		}
	};

	session.delete = function (req, res, next) {
		var session_id = cookies.get(req);

		if (session_id) {
			cookies.clear(res);
			data.delete_session(session_id, function (err, session) {
				next();
			});
		}
		else {
			next();
		}
	};

	session.inject = function (req, res, next) {
		var session_id = cookies.get(req);

		if (session_id) {
			data.get_session(session_id, function (err, session) {
				if (err || session === null || session_id !== session.id) {
					res.redirect("/auth/signin");
				}
				else {
					req.session = session;
					next();
				}
			});
		}
		else {
			res.redirect("/auth/signin");
		}

	};

})(module.exports);