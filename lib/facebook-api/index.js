(function (api) {

    var qs = require('qs');
    var fb = require('fb');

    api.get_request_token = function (client_id, redirect_url) {
        var parameters = {
            client_id: client_id,
            redirect_uri: redirect_url,
            state: 'facebook-state',
            response_type: 'token',
            scope: 'public_profile,email,user_posts,publish_actions'
        };
        return 'https://www.facebook.com/dialog/oauth?' + qs.stringify(parameters);
    };

    api.list = function (accessToken, next) {
        fb.setAccessToken(accessToken);

        fb.api('me/feed', function (res) {
            if (!res || res.error) {
                next(res.error, null);
            }
            else {
                next(null, res.data);
            }
        });
    };

    api.post = function (accessToken, post, next) {
        fb.setAccessToken(accessToken);

        fb.api('me/feed', 'post', { message: post }, function (res) {
            console.log(res);
            if (!res || res.error) {
                next(res.error, null);
            }
            else {
                next(null, res);
            }
        });
    };

})(module.exports);