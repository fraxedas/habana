(function(controllers) {
    var home = require('./home');
    var oauth = require('./oauth');
    var google = require('./google');
    var twitter = require('./twitter');
    var facebook = require('./facebook');
        
    controllers.init = function (app){
        home.init(app);
        oauth.init(app);
        google.init(app);
        twitter.init(app);
        facebook.init(app);
    };
})(module.exports);