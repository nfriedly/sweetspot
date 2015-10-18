'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;

bot.run({
    name: 'hotwheels honda hr-v',
    end: '10/27/15 10:00 am PST',
    startUrl: 'https://hotwheels.venturaassociates.net/',
    fn: function () {
        this.fillSelectors('#sweepsform', {
            '#bmonth': '8',
            '#bday': '1',
            '#byear': '1986'
        }, true);
        bot.shortWait();
        this.waitForSelector('#entry_form', function () {
            this.fillSelectors('#entry_form', {
                '#first': me.first,
                '#last': me.last,
                '#add1': me.addr,
                '#city': me.city,
                '#usstate': me.state,
                '#zip': me.zip,
                '#email': me.email,
                '#email_confirm': me.email,
                '#rulesread': true,
                '#optin_hotwheels': false,
                '#optin_honda': false
            }, true);
        });
        this.waitForText('Thanks for entering', bot.recordEntryConfirmed);
    }
});
