(function (oauth) {
	var data = require('../lib/data');

	oauth.init = function (app) {

		app.post('/oauth/secret/:provider/:client_id/:client_secret', function (req, res) {
			var provider_name = req.params.provider;
			var client_id = req.params.client_id;
			var client_secret = req.params.client_secret;
			var provider = {
				provider_name: provider_name,
				client_id: client_id,
				client_secret: client_secret
			};

			data.insert_provider(provider, function (err, session) {
				if (err) {
					res.status(500).send(err);
				}
				else {
					res.redirect('/oauth/secret/' + provider + '/' + client_id);
				}
			});
		});

		app.get('/oauth/secret/:provider/:client_id', function (req, res) {
			var provider_name = req.params.provider;
			var client_id = req.params.client_id;

			data.get_provider(provider_name, function (err, provider){
				if (err) {
					res.status(500).send(err);
				}
				else {
					if (provider && (provider.client_id === client_id)) {
						res.send(provider);
					}
					else {
						res.status(404).send();
					}
				}
			});
		});
	};


})(module.exports);