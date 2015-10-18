'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;

bot.run({
    name: 'bobvila',
    end: 'October 31, 2015 11:59 am EST',
    startUrl: 'http://www.bobvila.com/contest/kitchen-appliance-give-away',
    fn: function () {
        this.waitForSelector('#new_contest_registration', function () {
            this.click('#contest_registration_newsletter');
            this.click('#contest_registration_partner');
            this.fill('#new_contest_registration', {
                "contest_registration[first_name]": me.first,
                "contest_registration[email]": me.email,
                "contest_registration[prize_choice]": 66,
                "contest_registration[newsletter]": false,
                "contest_registration[partner]": false,
            }, true);
            this.waitForText('Thank You for Entering', bot.recordEntryConfirmed);
        });
    }
});
