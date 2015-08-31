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