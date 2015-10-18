#!/usr/bin/env casperjs
"use strict";
/* globals require:true, patchRequire:false*/
var require = patchRequire(require);
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;

bot.run({
    name: 'borax',
    end: 'January 15, 2016 3:00 PM PST',
    startUrl: 'https://www.20muleteamlaundry.com/let-your-kitchen-shine-with-the-multi-purpose-household-cleaner-20-mule-team-borax/',
    fn: function () {
        if (this.visible('#colorbox')) {
            this.click('#cboxClose');
            bot.shortWait();
        }
        this.waitForSelector('#promoForm', function () {
            this.fill('#promoForm', {
                "first": me.first,
                "last": me.last,
                "email": me.email,
                "gender": 'Male',
                "street1": me.addr,
                "city": me.city,
                "state": 'Ohio',
                "zip": me.zip,
                "phone": me.phone,
                "18_check": true,
                "purex_subscribe": false,
                "henkel_subscribe": false
            }, true);
            this.waitForText('Thanks for entering', bot.recordEntryConfirmed);
        });
    }
});
