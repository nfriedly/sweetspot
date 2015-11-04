//http://carrytheload.org/carry-the-load-sweepstakes/
"use strict";
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;

bot.run({
    name: 'crackerjack carry the load',
    end: 'December 31, 2015 11:59 pm CST',
    startUrl: 'http://carrytheload.org/carry-the-load-sweepstakes/',
    fn: function () {
        this.fillSelectors('#gform_1', {
            '#input_1_6_1': '8',
            '#input_1_6_2': '1',
            '#input_1_6_3': '1986'
        }, false);
        this.fill('#gform_1', {
            "input_1.3": me.first,
            "input_1.6": me.last,
            "input_2": me.email2,
            "input_2_2": me.email2,
            "input_4": me.phone,
            "input_5.1": me.addr,
            "input_5.3": me.city,
            "input_5.4": "Ohio",
            "input_5.5": me.zip,
            "input_7.1": true,
        }, true);
        this.waitForText('Thank you', bot.recordEntryConfirmed);
    }
});
