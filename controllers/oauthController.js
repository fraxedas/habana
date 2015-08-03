(function(oauth){
	var data = require("../data");
	var persist = require('node-persist');
    persist.initSync();
	
	oauth.init = function(app){
				
		app.get("/oauth/callback", function(req, res){
			res.send(data.get_author());
		});		
	};	
	
	
})(module.exports);