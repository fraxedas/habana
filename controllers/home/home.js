(function (homeController) {
	var data = require("../../data");

	homeController.init = function (app) {

		app.get("/", function (req, res) {
			res.render("home/index", {
				title: "Login",
				providers: data.get_providers()
			});
		});

		app.get("/author", function (req, res) {
			res.send(data.get_author());
		});
	};

})(module.exports);