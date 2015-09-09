(function (authentication) {

	var cookies = require("../../lib/cookies");
	var data = require("../../lib/data");

	authentication.init = function (app) {

		var bypass = function (req, res, next) {
			req.no_auth = true;
			next();
		};

		var authenticate = function (req, res, next) {
			
			if (req.no_auth) {
				next();
			}
			else {
				var user = cookies.get(req);

				if (user) {
					data.get_session(user.session_id, function (err, session) {
						if (err || session === null || user.session_id !== session.id) {
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

		app.all("/auth/*", bypass);

		app.all("/oauth/*", bypass);

		app.all("/*", authenticate);
		
	};


})(module.exports);