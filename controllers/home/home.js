(function (homeController) {
	var data = require("../../data");
	var cookies = require("../../lib/cookies");

	homeController.init = function (app) {
		
		app.get("/signin", function (req, res) {
			res.render("home/index", {
				title: "Login",
				providers: data.get_providers()
			});
		});
		
		app.get("/signout", function (req, res) {
			cookies.clear(res);
			res.redirect("/signin");
		});
		
		app.get("/", function (req, res) {
			var user = cookies.get(req);
			
			if(user){
				res.render("home/home", {
					title: "Welcome",
					user: user
				});
			}
			else {
				res.redirect("/signin");
			}
		});

		app.get("/author", function (req, res) {
			res.send(data.get_author());
		});
	};

})(module.exports);