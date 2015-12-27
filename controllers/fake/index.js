(function(controllers) {
    var oauth = require('./oauth');
        
    controllers.init = function (app){
        oauth.init(app);
    };
})(module.exports);