(function(controllers) {
    var home = require('./home');
    var auth = require('./auth');
    var oauth = require('./oauth');
    var google = require('./google');
    var twitter = require('./twitter');
    var facebook = require('./facebook');
    var fake = require('./fake');
        
    controllers.init = function (app){
        home.init(app);
        auth.init(app);
        oauth.init(app);
        google.init(app);
        twitter.init(app);
        facebook.init(app);
        fake.init(app);
    };
})(module.exports);