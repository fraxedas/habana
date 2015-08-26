(function (api) {

    var Twitter = require('twitter-node-client').Twitter;
    var passport = require('passport');
    var FacebookStrategy = require('passport-facebook').Strategy;

    api.get_request_token = function (client_id, client_secret, redirect_url, next) {
        passport.use(new FacebookStrategy({
            clientID: client_id,
            clientSecret: client_secret,
            callbackURL: redirect_url
        },
            function (accessToken, refreshToken, profile, done) {
                // asynchronous verification, for effect...
                process.nextTick(function () {
      
                    // To keep the example simple, the user's Facebook profile is returned to
                    // represent the logged-in user.  In a typical application, you would want
                    // to associate the Facebook account with a user record in your database,
                    // and return that user instead.
                    return done(null, profile);
                });
            }
            ));
    };

    api.get_auth_url = function (oauth_token) {
        return 'https://api.twitter.com/oauth/authenticate?oauth_token=' + oauth_token;
    };

    api.get_access_token = function (client_id, client_secret, redirect_url, oauth_token, oauth_token_secret, oauth_verifier, next) {
        var consumer = new oauth.OAuth(
            "https://twitter.com/oauth/request_token",
            "https://twitter.com/oauth/access_token",
            client_id,
            client_secret,
            "1.0A",
            redirect_url,
            "HMAC-SHA1");

        consumer.getOAuthAccessToken(oauth_token, oauth_token_secret, oauth_verifier, function (error, oauthAccessToken, oauthAccessTokenSecret, results) {
            if (error) {
                next("Error getting OAuth access token : " + error, null);
            } else {
                next(null, {
                    oauth_access_token: oauthAccessToken,
                    oauth_access_token_secret: oauthAccessTokenSecret
                });
            }
        });
    };

    api.list = function (consumerKey, consumerSecret, accessToken, accessTokenSecret, callBackUrl, next) {
        var twitter = new_twitter(consumerKey, consumerSecret, accessToken, accessTokenSecret, callBackUrl);
        twitter.getUserTimeline({ screen_name: '', count: '10' }, function (err, response, body) {
            next(err, null);
        }, function (data) {
            next(null, JSON.parse(data));
        });
    };

    api.post = function (consumerKey, consumerSecret, accessToken, accessTokenSecret, callBackUrl, post, next) {
        var twitter = new_twitter(consumerKey, consumerSecret, accessToken, accessTokenSecret, callBackUrl);
        twitter.postTweet({ status: post }, function (err, response, body) {
            next(err, null);
        }, function (data) {
            next(null, JSON.parse(data));
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