(function(controllers) {
    var auth = require('./auth');
        
    controllers.init = function (app){
        auth.init(app);
    };
})(module.exports);