(function(oauth){
	
	var persist = require('node-persist');
    persist.initSync();
	var facebook_api = require('../../lib/facebook-api');
	
	oauth.init = function(app){
				
		app.get('/oauth/facebook/auth', function(req, res){
			var facebook = persist.getItem('facebook');
			var redirect_url = redirect(req);
			facebook_api.get_request_token(facebook.client_id, facebook.client_secret, redirect_url, function (error, body) {
				console.log(body);
				if(error){
					res.render("error", {error: 'Something failed while authenticating with facebook', body: error});
				}
				else{
					facebook.request = body;
					persist.setItem('facebook', facebook);
					var url = facebook_api.get_auth_url(facebook.request.oauth_token);
					res.redirect(url);
				}
			});
			
		});
		
		app.get('/oauth/facebook/callback', function(req, res){
			var oauth_token = req.query.oauth_token;
			var oauth_verifier = req.query.oauth_verifier;
			
			var facebook = persist.getItem('facebook');
			facebook.request.oauth_verifier = oauth_verifier;					
					
			var redirect_url = redirect(req);
			
			facebook_api.get_access_token(facebook.client_id, facebook.client_secret, redirect_url, facebook.request.oauth_token, facebook.request.oauth_token_secret, facebook.request.oauth_verifier, function(err, tokens){
				if(err) {
	               res.render("error", {error: 'Something failed while authenticating with facebook', body: err});				             
	            }
	            else{
	                facebook.request.oauth_access_token = tokens.oauth_access_token;
					facebook.request.oauth_access_token_secret = tokens.oauth_access_token_secret;
					persist.setItem('facebook', facebook);
					res.render("facebook/facebook", {title: 'facebook oauth is done'});
	            }
			});			
		});
		
		var redirect = function(req) {
	        return req.protocol + '://' + req.get('host') + '/oauth/facebook/callback';
	    };   
		
	};	
	
	
})(module.exports);