(function (auth) {
	var data = require("../../lib/data");

	auth.init = function (app) {

		app.get("/auth/signin", function (req, res) {
			res.render("auth/index", {
				title: "Login",
				providers: data.get_providers()
			});
		});		
	};

})(module.exports);