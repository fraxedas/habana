(function (api) {

    var Twitter = require('twitter-node-client').Twitter;

    api.get_auth_url = function (client_id, client_secret, redirect_url) {
        var url = 'https://api.twitter.com/oauth/authenticate?oauth_token=';
        return url + client_id;
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
    
    api.list = function (consumerKey, consumerSecret, accessToken, accessTokenSecret, callBackUrl, next) {
        var twitter = new_twitter(consumerKey, consumerSecret, accessToken, accessTokenSecret, callBackUrl);
        twitter.getUserTimeline({ screen_name: '', count: '10'}, function (err, response, body) {
            next(err, null);
        }, function (data) {
            next(null, data);
        });
    };
   
    var new_twitter = function (consumerKey, consumerSecret, accessToken, accessTokenSecret, callBackUrl) {
        return new Twitter({
            consumerKey: consumerKey,
            consumerSecret: consumerSecret,
            accessToken: accessToken,
            accessTokenSecret: accessTokenSecret,
            callBackUrl: callBackUrl
        });  
    };

})(module.exports);