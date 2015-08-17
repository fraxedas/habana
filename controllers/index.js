(function(controllers) {
    var home = require('./home');
    var oauth = require('./oauth');
    var google = require('./google');
    var twitter = require('./twitter');
        
    controllers.init = function (app){
        home.init(app);
        oauth.init(app);
        google.init(app);
        twitter.init(app);
    };
})(module.exports);