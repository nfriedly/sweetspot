'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;


bot.run({
    name: 'yellowstone',
    end: 'October 31, 2015 11:59:59 pm EST',
    startUrl: 'http://atlanticluggage.com/fall-sweepstakes-2015/',
    fn: function () {
        this.fill('#Optin38', {
            "field6": me.first,
            "field7": me.last,
            "UEmail": me.email,
            "field8": me.phone,
            "field9": me.zip,
            field10: true
        }, true);
        this.waitForText('You are now registered', bot.recordEntryConfirmed);
    }
});
