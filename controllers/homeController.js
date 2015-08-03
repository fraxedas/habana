(function(homeController){
	var data = require("../data");
	
	homeController.init = function(app){
				
		app.get("/author", function(req, res){
			res.send(data.get_author());
		});
	};
	
})(module.exports);