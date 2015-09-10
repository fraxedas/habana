(function (cookies) {
    var week = 7 * 24 * 60 * 60 * 1000;
    var cookie_options = { maxAge: week, httpOnly: true };
    var cookie_name = 'session_id';

    cookies.set = function (res, session_id) {
        res.cookies.set(cookie_name, session_id, cookie_options);
    };

    cookies.get = function (req) {
        return req.cookies.get(cookie_name);
    };

    cookies.clear = function (res) {
        res.cookies.set(cookie_name, null);
    };

})(module.exports);