'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;


bot.run({
    name: 'wiserair',
    end: 'November 30, 2015 11:59:59 pm CST',
    startUrl: 'https://www.wiserair.com/giveaway/',
    fn: function () {
        this.withFrame(0, function () {
            this.clickLabel('Confirm', 'button');
            this.fill('#input', {
                "custom_4_first": me.first,
                "custom_4_last": me.last,
                "custom_8": me.addr,
                "custom_10": me.city,
                "custom_11": me.state,
                "custom_12": me.zip,
                "email": me.email,
                "custom_13": me.phone,
            }, true);
            this.waitForText('Thanks! You\'re entered!', bot.recordEntryConfirmed);
        });
    }
});
