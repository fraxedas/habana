(function(oauth){
	var persist = require('node-persist');
    persist.initSync();
	
	oauth.init = function(app){
				
		app.post('/oauth/secret/:provider/:client_id/:client_secret', function(req, res){
	        var provider = req.params.provider;
	        var client_id = req.params.client_id;
	        var client_secret = req.params.client_secret;
	        persist.setItem(provider,
				{
					client_id: client_id, 
					client_secret: client_secret
				});
	                
	        res.redirect('/oauth/secret/' + provider + '/' + client_id);
	    });
		
		app.get('/oauth/secret/:provider/:client_id', function(req, res){
	        var provider = req.params.provider;
	        var client_id = req.params.client_id;
	        var credentials = persist.getItem(provider);
			
			if(credentials && (credentials.client_id === client_id)){
				res.send(credentials);
			}
			else{
				res.status(404).send();
			}     
	        
	    });	
	};	
	
	
})(module.exports);