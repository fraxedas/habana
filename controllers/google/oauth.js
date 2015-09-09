(function (oauth) {

	var persist = require('node-persist');
    persist.initSync();
	var google_api = require('../../lib/google-api');
	var cookies = require("../../lib/cookies");
	var data = require("../../lib/data");

	oauth.init = function (app) {

		app.get('/oauth/google/auth', function (req, res) {
			var google = persist.getItem('google');
			var redirect_url = redirect(req);
			var url = google_api.get_auth_url(google.client_id, google.client_secret, redirect_url);
			res.redirect(url);
		});

		app.get('/oauth/google/callback', function (req, res) {
			var code = req.query.code;
			var google = persist.getItem('google');
			var redirect_url = redirect(req);

			google_api.get_tokens(google.client_id, google.client_secret, redirect_url, code, function (err, tokens) {
				if (err) {
					res.render("error", { error: 'Something failed while authenticating with google', body: err });
				}
				else {
					google.tokens = tokens;
					persist.setItem('google', google);

					data.insert_session(google, function (err, session) {
						if (err) {
							res.render("error", { error: 'Something failed', body: err });
						}
						else {
							cookies.set(res, {
								session_id: session.id,
								provider_name: 'google'
							});
							res.render("google/google", { title: 'Google oauth is done' });
						}
					});
				}
			});
		});

		var redirect = function (req) {
			return req.protocol + '://' + req.get('host') + '/oauth/google/callback';
		};

	};


})(module.exports);