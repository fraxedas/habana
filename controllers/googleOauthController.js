(function(oauth){
	
	var persist = require('node-persist');
    persist.initSync();
	var google_api = require('../lib/google-api');
	
	oauth.init = function(app){
				
		app.get('/oauth/google/auth', function(req, res){
			var google = persist.getItem('google');
			var redirect_url = redirect(req);
			var url = google_api.get_auth_url(google.client_id, google.client_secret, redirect_url);
			res.redirect(url);
		});
		
		app.get('/oauth/google/callback', function(req, res){
			var code = req.query.code;
			var google = persist.getItem('google');
			var redirect_url = redirect(req);
			
			google_api.get_tokens(google.client_id, google.client_secret, redirect_url, code, function(err, tokens){
				if(err) {
	               res.render("error", {error: 'Something failed while authenticating with google', body: err});				             
	            }
	            else{
	                google.tokens = tokens;
					persist.setItem('google', google);
					res.render("google", {title: 'Google oauth is done'});
	            }
			});			
		});
		
		app.get('/google/list', function(req, res){
			var google = persist.getItem('google');
			var redirect_url = redirect(req);
			
			google_api.list(google.client_id, google.client_secret, redirect_url, google.tokens.access_token, function(err, response){
				if(err) {
					console.log(err);
					res.render("error", {error: 'Something failed while posting to google', body: err});				             
	            }
	            else{
	                res.send(response); 
	            }
			});			
		});
		
		app.get('/google/me', function(req, res){
			var google = persist.getItem('google');
			var redirect_url = redirect(req);
			
			google_api.me(google.client_id, google.client_secret, redirect_url, google.tokens.access_token, function(err, response){
				if(err) {
	               res.render("error", {error: 'Something failed while posting to google', body: err});				             
	            }
	            else{
	                res.send(response); 
	            }
			});			
		});
		
		app.post('/oauth/google/:client_id/:client_secret', function(req, res){
	        var client_id = req.params.client_id;
	        var client_secret = req.params.client_secret;
	        persist.setItem('google',
				{
					client_id: client_id, 
					client_secret: client_secret
				});
	                
	        res.redirect('/oauth/google/' + client_id);
	    });
		
		app.get('/oauth/google/:client_id', function(req, res){
	        var client_id = req.params.client_id;
	        var google = persist.getItem('google');
			
			if(google && (google.client_id === client_id)){
				res.send(google);
			}
			else{
				res.status(404).send();
			}     
	        
	    });
		
		var redirect = function(req) {
	        return req.protocol + '://' + req.get('host') + '/oauth/google/callback';
	    };   
		
	};	
	
	
})(module.exports);