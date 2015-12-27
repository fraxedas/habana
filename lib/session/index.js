(function (session) {
    var cookies = require("../cookies");
	var data = require("../data");

	session.set = function (res, session, next) {
		var user = session.user;
		var oauth = session.oauth;

		data.get_or_create_user(user.user_id, function (err, user) {
			if (err) {
				next(err);
			}
			else {
				
			}
		});


		data.insert_session(session, function (err, session) {
			if (err) {
				next(err);
			}
			else {
				cookies.set(res, session.id);
				next();
			}
		});

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
				if (err || session === null) {
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