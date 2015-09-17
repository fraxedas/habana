(function (schedule) {
    var CronJob = require('cron').CronJob;
    var data = require("../data");

    var job = new CronJob({
        cronTime: '1 * * * * *', //Todo: Fix the pattern to run every hour
        onTick: function () {
            console.log('Cleaning expired sessions');
            
            data.delete_expired_sessions(function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(result.result.n + ' sessions were expired');
                }
            });            
        },
        start: true,
        timeZone: null
    });

    schedule.init = function () {
        job.start();
    };


})(module.exports);