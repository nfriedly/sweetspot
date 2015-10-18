'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;

bot.run({
    name: 'game like a pro sweepstakes',
    end: 'October 19, 2015 11:59 PM PST',
    startUrl: 'http://promotions.newegg.com/nepro/15-4467/index.html?cm_mmc=SNC-twitter-_-sweeps-gamelikeapro-_-NA-_-NA&hootPostID=c49f68517f9091193f9c824d975962f9',
    fn: function () {
        bot.min24();
        this.withFrame(0, function () {
            //this.capture('./screen.png');
            //this.debugHTML();
            this.fill('#form_form', {
                'form[email]': me.email,
                'form[first_name]': me.first,
                'form[last_name]': me.last,
                'form[address_1]': me.addr,
                'form[city]': me.city,
                'form[province]': me.state,
                'form[postal_code]': me.zip,
                'form[phone]': me.phone,
                'form[age]': '29'
            }, true);

            this.waitForText("Thank you for your submission", bot.recordEntryConfirmed);
        });
    }
});
