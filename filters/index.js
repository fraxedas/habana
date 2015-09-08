(function(filters) {
    var authentication = require('./authentication');
        
    filters.init = function (app){
        authentication.init(app);
    };
})(module.exports);