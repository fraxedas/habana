(function (api) {

    var Twitter = require('twitter-node-client').Twitter;
    var passport = require('passport');
    var FacebookStrategy = require('passport-facebook').Strategy;
    var qs = require('qs');

    api.get_request_token = function (client_id, redirect_url) {
        var parameters = {
            client_id: client_id,
            redirect_uri: redirect_url,
            state: 'facebook-state',
            response_type: 'token',
            scope: 'public_profile,email,'
        };
        return 'https://www.facebook.com/dialog/oauth?' + qs.stringify(parameters);
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