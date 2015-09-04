(function (cookies) {
    var week = 7 * 24 * 60 * 60 * 1000;
    var cookie_options = { maxAge: week, httpOnly: true };
    var cookie_name = 'habana_user';

    cookies.set = function (res, value) {
        var cookie_value = JSON.stringify(value);
        res.cookies.set(cookie_name, cookie_value, cookie_options);
    };

    cookies.get = function (req) {
        var cookie_value = req.cookies.get(cookie_name);
        try {
            return JSON.parse(cookie_value);
        } catch (e) {
            return null;
        }
    };

    cookies.clear = function (res) {
        res.cookies.set(cookie_name, null);
    };

})(module.exports);