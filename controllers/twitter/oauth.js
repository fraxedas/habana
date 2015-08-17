(function(oauth){
	
	var persist = require('node-persist');
    persist.initSync();
	var twitter_api = require('../../lib/twitter-api');
	
	oauth.init = function(app){
				
		app.get('/oauth/twitter/auth', function(req, res){
			var twitter = persist.getItem('twitter');
			var redirect_url = redirect(req);
			var url = twitter_api.get_auth_url(twitter.client_id, twitter.client_secret, redirect_url);
			res.redirect(url);
		});
		
		app.get('/oauth/twitter/callback', function(req, res){
			var code = req.query.code;
			var twitter = persist.getItem('twitter');
			var redirect_url = redirect(req);
			
			twitter_api.get_tokens(twitter.client_id, twitter.client_secret, redirect_url, code, function(err, tokens){
				if(err) {
	               res.render("error", {error: 'Something failed while authenticating with twitter', body: err});				             
	            }
	            else{
	                twitter.tokens = tokens;
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