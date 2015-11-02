'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;


bot.run({
    name: 'nissan voice',
    end: '11/4/2015 10:00 am PST',
    startUrl: 'http://www.nbc.com/the-voice/nissan',
    fn: function () {
        this.withFrame(0, function () {
            this.waitForSelector('label.rules-check', function () {
                bot.shortWait();
                this.then(function() {
                    this.click('label.rules-check');
                    this.fill('#sweepstakes_pom', {
                        'first-name': me.first,
                        'last-name': me.last,
                        'email': me.email,
                        'phone': me.phone,
                        'month': '08',
                        'day': '01',
                        'year': '1986',
                        'zip-code': me.zip,
                        //'rules-check': true
                    }, true);
                });
                this.waitForResource('https://www.nbc.com/spt/nsweeps/nis_success_d.png', bot.recordEntryConfirmed);
            });
        });
    }
});
