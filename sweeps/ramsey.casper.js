'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;

bot.run({
    name: 'Dave Ramseys Christmas',
    end: 'December 21, 2015 11:59 pm CST',
    startUrl: 'https://www.daveramsey.com/giveaway/christmas-giveaway-2015',
    fn: function () {
        this.fill('form.new_contest_entry', {
            'contest_entry[first_name]': me.first,
            'contest_entry[last_name]': me.last,
            'contest_entry[email]': me.email2,
            'contest_entry[phone]': me.phone,
            'contest_entry[postal_code]': me.zip,
        }, true);
        this.waitForText('Thanks for Entering!', bot.recordEntryConfirmed);
    }
});
