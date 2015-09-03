(function(controllers) {
    var home = require('./home');
        
    controllers.init = function (app){
        home.init(app);
    };
})(module.exports);