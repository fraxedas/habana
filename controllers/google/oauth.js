(function (oauth) {

	var data = require('../../lib/data');
    var google_api = require('../../lib/google-api');
	var session = require("../../lib/session");

	oauth.init = function (app) {

		app.get('/oauth/google/auth', function (req, res) {
            data.get_provider('google', function (err, google) {
                if (err) {
                    res.render("error", { error: 'Something failed while authenticating with google', body: err });
                } else {
                    var redirect_url = redirect(req);
                    var url = google_api.get_auth_url(google.client_id, google.client_secret, redirect_url);
                    res.redirect(url);
                }
            });			
		});

		app.get('/oauth/google/callback', function (req, res) {
			var code = req.query.code;
			var redirect_url = redirect(req);

            data.get_provider('google', function (err, google) {
                google_api.get_tokens(google.client_id, google.client_secret, redirect_url, code, function (err, tokens) {
                    if (err) {
                        res.render("error", { error: 'Something failed while authenticating with google', body: err });
                    }
                    else {
                        google.tokens = tokens;
                        session.set(res, google, function (err) {
                            if (err) {
                                res.render("error", { error: 'Something failed while authenticating with google', body: err });
                            }
                            else {
                                res.render("google/google", { title: 'Google oauth is done' });
                            }
                        });

                    }
                });
            });	
		});

		var redirect = function (req) {
			return req.protocol + '://' + req.get('host') + '/oauth/google/callback';
		};

	};


})(module.exports);