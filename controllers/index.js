(function(controllers) {
    var homeController = require('./homeController');
    var oauthController = require('./oauthController');
        
    controllers.init = function (app){
        homeController.init(app);
        oauthController.init(app);
    };
})(module.exports);