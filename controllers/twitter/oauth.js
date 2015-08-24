(function(oauth){
	
	var persist = require('node-persist');
    persist.initSync();
	var twitter_api = require('../../lib/twitter-api');
	
	oauth.init = function(app){
				
		app.get('/oauth/twitter/auth', function(req, res){
			var twitter = persist.getItem('twitter');
			var redirect_url = redirect(req);
			twitter_api.get_request_token(twitter.client_id, twitter.client_secret, redirect_url, function (error, body) {
				console.log(body);
				if(error){
					res.render("error", {error: 'Something failed while authenticating with twitter', body: error});
				}
				else{
					twitter.request = body;
					persist.setItem('twitter', twitter);
					var url = twitter_api.get_auth_url(twitter.request.oauth_token);
					res.redirect(url);
				}
			});
			
		});
		
		app.get('/oauth/twitter/callback', function(req, res){
			var oauth_token = req.query.oauth_token;
			var oauth_verifier = req.query.oauth_verifier;
			
			var twitter = persist.getItem('twitter');
			twitter.request.oauth_verifier = oauth_verifier;					
					
			var redirect_url = redirect(req);
			
			twitter_api.get_access_token(twitter.client_id, twitter.client_secret, redirect_url, twitter.request.oauth_token, twitter.request.oauth_token_secret, twitter.request.oauth_verifier, function(err, tokens){
				if(err) {
	               res.render("error", {error: 'Something failed while authenticating with twitter', body: err});				             
	            }
	            else{
	                twitter.request.oauth_access_token = tokens.oauth_access_token;
					twitter.request.oauth_access_token_secret = tokens.oauth_access_token_secret;
					persist.setItem('twitter', twitter);
					res.render("twitter/twitter", {title: 'twitter oauth is done'});
	            }
			});			
		});
		
		var redirect = function(req) {
	        return req.protocol + '://' + req.get('host') + '/oauth/twitter/callback';
	    };   
		
	};	
	
	
})(module.exports);