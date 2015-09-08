(function (authentication) {

	var cookies = require("../../lib/cookies");
	var data = require("../../lib/data");

	authentication.init = function (app) {

		app.all("/auth/*", function (req, res, next) {
			console.log("Intercepting requests for login");
			req.noauth = true;
			next();
		});

		app.all("/oauth/*", function (req, res, next) {
			console.log("Intercepting requests for oauth");
			req.noauth = true;
			next();
		});

		app.all("/*", function (req, res, next) {
			console.log("Intercepting requests for everything else");

			var user = cookies.get(req);
			
			if(req.noauth) next();			
			
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

		});

	};


})(module.exports);