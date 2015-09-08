(function (authentication) {

	var cookies = require("../../lib/cookies");
	var data = require("../../lib/data");

	authentication.init = function (app) {

		var bypass = function (req, res, next) {
			req.noauth = true;
			next();
		};

		var authenticate = function (req, res, next) {
			
			if (req.noauth) {
				next();
			}
			else {
				var user = cookies.get(req);

				if (user) {
					data.get_session(user.session_id, function (err, session) {
						if (err) {
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

		app.use(function (err, req, res, next) {
			console.error(err.stack);
			res.render("error", { error: 'Something failed', body: err });
		});

	};


})(module.exports);