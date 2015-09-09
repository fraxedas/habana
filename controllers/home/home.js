(function (homeController) {
	var data = require("../../lib/data");

	homeController.init = function (app) {

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