(function (api) {

    var Twitter = require('twitter-node-client').Twitter;

    api.me = function (consumerKey, consumerSecret, accessToken, accessTokenSecret, callBackUrl, next) {
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