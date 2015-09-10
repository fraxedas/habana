(function (authentication) {

	var cookies = require("../../lib/cookies");
	var data = require("../../lib/data");

	authentication.init = function (app) {

		var bypass = function (req, res, next) {
			req.no_auth = true;
			next();
		};

		var logout = function (req, res, next) {
			req.no_auth = true;

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

		var authenticate = function (req, res, next) {

			if (req.no_auth) {
				next();
			}
			else {
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
			}
		};

		app.all("/auth/*", logout);

		app.all("/oauth/*", bypass);

		app.all("/*", authenticate);

	};


})(module.exports);