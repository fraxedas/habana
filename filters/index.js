(function(filters) {
    var authentication = require('./authentication');
    var error = require('./error');
        
    filters.init = function (app){
        authentication.init(app);
        error.init(app);
    };
    
})(module.exports);