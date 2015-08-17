(function(controllers) {
    var oauth = require('./oauth');
    var api = require('./api');
        
    controllers.init = function (app){
        oauth.init(app);
        api.init(app);
    };
})(module.exports);