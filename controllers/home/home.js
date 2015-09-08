(function (homeController) {
	var data = require("../../lib/data");
	var cookies = require("../../lib/cookies");

	homeController.init = function (app) {

		app.get("/auth/signin", function (req, res) {
			res.render("home/index", {
				title: "Login",
				providers: data.get_providers()
			});
		});

		app.get("/auth/signout", function (req, res) {
			cookies.clear(res);
			res.redirect("/auth/signin");
		});

		app.get("/", function (req, res) {
			res.render("home/home", {
				title: "Welcome",
				session: req.session
			});
		});

		app.get("/author", function (req, res) {
			res.send(data.get_author());
		});
	};

})(module.exports);