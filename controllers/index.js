(function(controllers) {
    var homeController = require('./homeController');
    var oauthController = require('./oauthController');
    var googleOauthController = require('./googleOauthController');
        
    controllers.init = function (app){
        homeController.init(app);
        oauthController.init(app);
        googleOauthController.init(app);
    };
})(module.exports);