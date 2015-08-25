(function (api) {

	var persist = require('node-persist');
    persist.initSync();
	var twitter_api = require('../../lib/twitter-api');

	api.init = function (app) {

		app.get('/twitter/list', function (req, res) {
			var twitter = persist.getItem('twitter');
			var redirect_url = redirect(req);
			var format = req.query.format;

			twitter_api.list(twitter.client_id, twitter.client_secret, twitter.request.oauth_access_token, twitter.request.oauth_access_token_secret, redirect_url, function (err, response) {
				if (err) {
					res.render("error", { error: 'Something failed while reading from twitter', body: err });
				}
				else {
					if (format === 'json')
						res.send(response);
					else
						res.render("twitter/list", { title: 'Tweets', posts: response });
				}
			});
		});

		app.post('/twitter/post', function (req, res) {
			var twitter = persist.getItem('twitter');
			var redirect_url = redirect(req);
			console.log(req);
			var post = req.body.post;

			twitter_api.post(twitter.client_id, twitter.client_secret, twitter.request.oauth_access_token, twitter.request.oauth_access_token_secret, redirect_url, post, function (err, response) {
				if (err) {
					res.render("error", { error: 'Something failed while posting to twitter', body: err });
				}
				else {
					res.redirect('/twitter/list');
				}
			});
		});

		var redirect = function (req) {
			return req.protocol + '://' + req.get('host') + '/oauth/twitter/callback';
		};

	};

})(module.exports);