(function(oauth){
	
	var persist = require('node-persist');
    persist.initSync();
	var google_api = require('../lib/google-api');
	
	oauth.init = function(app){
				
		app.get('/oauth/google/auth/:client_id', function(req, res){
			var client_id = req.params.client_id;
			var client_secret = persist.getItem(client_id);
			var redirect_url = req.protocol + '://' + req.get('host') + '/oauth/google/callback';
			var url = google_api.get_auth_url(client_id, client_secret, redirect_url);
			
			console.log(url);
			res.redirect(url);
		});
		
		app.get('/oauth/google/callback', function(req, res){
			var code = req.query.code;
			
			console.log(code);
			
			res.send('OK');
		});
		
		app.post('/oauth/google/:client_id/:client_secret', function(req, res){
	        var client_id = req.params.client_id;
	        var client_secret = req.params.client_secret;
	        persist.setItem(client_id,client_secret);
	                
	        res.redirect('/oauth/google/' + client_id);
	    });
		
		app.get('/oauth/google/:client_id', function(req, res){
	        var client_id = req.params.client_id;
	                
	        res.send({
	            client_id: client_id,
	            client_secret: persist.getItem(client_id)
	        });
	    });
		
	};	
	
	
})(module.exports);