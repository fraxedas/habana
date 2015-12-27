(function (authentication) {

	var session = require("../../lib/session");

	authentication.init = function (app) {

		var bypass = function (req, res, next) {
			req.no_auth = true;
			next();
		};

		var logout = function (req, res, next) {
			req.no_auth = true;

			session.delete(req, res, next);
		};

		var authenticate = function (req, res, next) {
			if (req.no_auth) {
				next();
			}
			else {
				session.inject(req, res, next);
			}
		};

		app.all("/auth/*", logout);

		app.all("/oauth/*", bypass);

		app.all("/*", authenticate);

	};


})(module.exports);