(function (oauth) {

	var persist = require('node-persist');
    persist.initSync();
	var facebook_api = require('../../lib/facebook-api');

	oauth.init = function (app) {

		app.get('/oauth/facebook/auth', function (req, res) {
			var facebook = persist.getItem('facebook');
			var redirect_url = redirect(req);
			var url = facebook_api.get_request_token(facebook.client_id, redirect_url);
			res.redirect(url);
		});

		app.get('/oauth/facebook/callback', function (req, res) {
			res.render("facebook/callback", { title: 'facebook oauth is almost done', location: '/oauth/facebook/callback/client'});
		});

		app.get('/oauth/facebook/callback/client', function (req, res) {
			var access_token = req.query.access_token;
			var expires_in = req.query.expires_in;
			
			var facebook = persist.getItem('facebook');
			facebook.access_token = access_token;
			facebook.expires_in = expires_in;

			if (!access_token) {
				res.render("error", { error: 'Something failed while authenticating with facebook', body: 'Please contact the developer' });
			}
			else {
				persist.setItem('facebook', facebook);
				res.render("facebook/facebook", { title: 'facebook oauth is done' });
			}

		});

		var redirect = function (req) {
			return req.protocol + '://' + req.get('host') + '/oauth/facebook/callback';
		};

	};


})(module.exports);