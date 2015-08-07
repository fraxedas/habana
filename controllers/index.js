(function(controllers) {
    var homeController = require('./homeController');
    var oauthController = require('./oauthController');
    var google = require('./google');
        
    controllers.init = function (app){
        homeController.init(app);
        oauthController.init(app);
        google.init(app);
    };
})(module.exports);