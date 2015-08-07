(function(api){
	
	var persist = require('node-persist');
    persist.initSync();
	var google_api = require('../../lib/google-api');
	
	api.init = function(app){
				
		app.get('/google/list', function(req, res){
			var google = persist.getItem('google');
			var redirect_url = redirect(req);
			
			google_api.list(google.client_id, google.client_secret, redirect_url, google.tokens.access_token, function(err, response){
				if(err) {
					console.log(err);
					res.render("error", {error: 'Something failed while posting to google', body: err});	             
	            }
	            else{
	                res.render("google/list", {title: response.title, posts: response.items});
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
				
		var redirect = function(req) {
	        return req.protocol + '://' + req.get('host') + '/oauth/google/callback';
	    };   
		
	};	
	
	
})(module.exports);