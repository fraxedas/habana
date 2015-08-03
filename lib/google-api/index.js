(function(api){
    
    var google = require('googleapis');
	var OAuth2 = google.auth.OAuth2;
    var scopes = [
        'https://www.googleapis.com/auth/plus.me'
	];

    api.get_auth_url = function(client_id, client_secret, redirect_url) {
        var oauth2Client = new OAuth2(client_id, client_secret, redirect_url);
        
        return oauth2Client.generateAuthUrl({
			  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token) 
			  scope: scopes // If you only need one scope you can pass it as string 
		});
    }; 
    
    api.get_tokens = function(client_id, client_secret, redirect_url, code, next) {
        var oauth2Client = new OAuth2(client_id, client_secret, redirect_url);
        
        oauth2Client.getToken(code, function(err, tokens) {
            if(!err) {
                oauth2Client.setCredentials(tokens);
                next(tokens, null);            
            }
            else{
                next(null, err);
            }
        });
    };    

})(module.exports);