(function (auth) {
	var data = require("../../lib/data");
	var cookies = require("../../lib/cookies");

	auth.init = function (app) {

		app.get("/auth/signin", function (req, res) {
			res.render("auth/index", {
				title: "Login",
				providers: data.get_providers()
			});
		});

		app.get("/auth/signout", function (req, res) {
			cookies.clear(res);
			res.redirect("/auth/signin");
		});
		
	};

})(module.exports);