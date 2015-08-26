(function (api) {

	var persist = require('node-persist');
    persist.initSync();
	var facebook_api = require('../../lib/facebook-api');

	api.init = function (app) {

		app.get('/facebook/list', function (req, res) {
			var facebook = persist.getItem('facebook');
			var redirect_url = redirect(req);
			var format = req.query.format;

			facebook_api.list(facebook.client_id, facebook.client_secret, facebook.request.oauth_access_token, facebook.request.oauth_access_token_secret, redirect_url, function (err, response) {
				if (err) {
					res.render("error", { error: 'Something failed while reading from facebook', body: err });
				}
				else {
					if (format === 'json')
						res.send(response);
					else
						res.render("facebook/list", { title: 'Tweets', posts: response });
				}
			});
		});

		app.post('/facebook/post', function (req, res) {
			var facebook = persist.getItem('facebook');
			var redirect_url = redirect(req);
			console.log(req);
			var post = req.body.post;

			facebook_api.post(facebook.client_id, facebook.client_secret, facebook.request.oauth_access_token, facebook.request.oauth_access_token_secret, redirect_url, post, function (err, response) {
				if (err) {
					res.render("error", { error: 'Something failed while posting to facebook', body: err });
				}
				else {
					res.redirect('/facebook/list');
				}
			});
		});

		var redirect = function (req) {
			return req.protocol + '://' + req.get('host') + '/oauth/facebook/callback';
		};

	};

})(module.exports);