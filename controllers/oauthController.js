(function(oauth){
	var data = require("../data");
	var persist = require('node-persist');
    persist.initSync();
	
	oauth.init = function(app){
				
		app.get("/oauth", function(req, res){
			res.redirect("/author");
		});
		
		app.get("/oauth/callback", function(req, res){
			res.send(data.get_author());
		});
		
		app.post("/oauth/google/:appId/:appSecret", function(req, res){
	        var appId = req.params.appId;
	        var appSecret = req.params.appSecret;
	        persist.setItem(appId,appSecret);
	                
	        res.redirect("/oauth/google/" + appId);
	    });
		
		app.get("/oauth/google/:appId", function(req, res){
	        var appId = req.params.appId;
	                
	        res.send({
	            appId: appId,
	            appSecret: persist.getItem(appId)
	        });
	    });
		
	};	
	
	
})(module.exports);