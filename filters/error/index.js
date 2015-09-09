(function (error) {

	error.init = function (app) {

		app.use(function (err, req, res, next) {
			console.error(err.stack);
			res.render("error", { error: 'Something failed', body: err });
		});

	};


})(module.exports);