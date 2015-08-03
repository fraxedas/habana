(function (api) {

    var google = require('googleapis');
    var OAuth2 = google.auth.OAuth2;
    var scopes = [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.me',
        'https://www.googleapis.com/auth/plus.stream.read',
        'https://www.googleapis.com/auth/plus.stream.write',
        'https://www.googleapis.com/auth/plus.circles.read',
        'https://www.googleapis.com/auth/plus.media.upload',
        'https://www.googleapis.com/auth/plus.profiles.read'      
    ];

    api.get_auth_url = function (client_id, client_secret, redirect_url) {
        var oauth2Client = new OAuth2(client_id, client_secret, redirect_url);

        return oauth2Client.generateAuthUrl({
            access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token) 
            scope: scopes // If you only need one scope you can pass it as string 
        });
    };

    api.get_tokens = function (client_id, client_secret, redirect_url, code, next) {
        var oauth2Client = new OAuth2(client_id, client_secret, redirect_url);

        oauth2Client.getToken(code, function (err, tokens) {
            if (!err) {
                oauth2Client.setCredentials(tokens);
                next(null, tokens);
            }
            else {
                next(err, null);
            }
        });
    };
    
    api.me = function (client_id, client_secret, redirect_url, access_token, next) {
        var oauth2Client = new OAuth2(client_id, client_secret, redirect_url);
        oauth2Client.setCredentials({
            access_token: access_token
        });
        var plus = google.plus('v1');

        plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, response) {
            next(err, response);
        });
    };
    
    api.insert = function (client_id, client_secret, redirect_url, access_token, text, next) {
        var oauth2Client = new OAuth2(client_id, client_secret, redirect_url);
        oauth2Client.setCredentials({
            access_token: access_token
        });
        var plus = google.plusDomains('v1');
        
        var resource = {
            object: {
                originalContent: text,
            }
        };

        plus.activities.insert({ userId: 'me', preview: false, resource: resource , auth: oauth2Client }, function(err, response) {
            next(err, response);
        });
    };

})(module.exports);