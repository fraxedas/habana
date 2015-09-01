(function (api) {

	var persist = require('node-persist');
    persist.initSync();
	var facebook_api = require('../../lib/facebook-api');

	api.init = function (app) {

		app.get('/facebook/list', function (req, res) {
			var facebook = persist.getItem('facebook');
			var format = req.query.format;

			facebook_api.list(facebook.access_token, function (err, response) {
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
			var post = req.body.post;

			facebook_api.post(facebook.access_token, post, function (err, response) {
				if (err) {
					res.render("error", { error: 'Something failed while posting to facebook', body: err });
				}
				else {
					res.redirect('/facebook/list');
				}
			});
		});

	};

})(module.exports);