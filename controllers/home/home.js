(function (homeController) {
	var data = require("../../data");

	homeController.init = function (app) {
		var cookie = 'user';
		
		app.get("/signin", function (req, res) {
			res.render("home/index", {
				title: "Login",
				providers: data.get_providers()
			});
		});
		
		app.get("/signout", function (req, res) {
			res.cookies.set(cookie, null);
			res.redirect("/signin");
		});
		
		app.get("/", function (req, res) {
			var user = req.cookies.get('user');
			
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