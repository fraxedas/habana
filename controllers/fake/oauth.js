(function (oauth) {

	oauth.init = function (app) {

		var session = require("../../lib/session");

		app.get('/oauth/fake/auth', function (req, res) {
			var redirect_url = redirect(req);
			res.redirect(redirect_url);
		});

		app.get('/oauth/fake/callback', function (req, res) {
			var fake = {};

			session.set(res, fake, function (err) {
				if (err) {
					res.render("error", { error: 'Something failed while authenticating with google', body: err });
				}
				else {
					res.render("fake/fake", { title: 'Fake oauth is done' });
				}
			});


		});

		var redirect = function (req) {
			return req.protocol + '://' + req.get('host') + '/oauth/fake/callback';
		};

	};


})(module.exports);