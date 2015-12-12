'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;

bot.run({
    name: 'newegg the tech awakens sweepstakes',
    end: 'January 10, 2016 11:59 PM PST',
    startUrl: 'http://promotions.newegg.com/nepro/15-6144/index.html?cm_mmc=SNC-Facebook-_-Sweeps-_-TechAwakens-post1-_-NA-_-NA',
    fn: function () {
        bot.min24();
        this.withFrame(0, function () {

            this.fill('#form_form', {
                'form[email]': me.email,
                'form[first_name]': me.first,
                'form[last_name]': me.last,
                'form[address_1]': me.addr,
                'form[city]': me.city,
                'form[province]': me.state,
                'form[postal_code]': me.zip,
                'form[age]': '29',
                'form[phone]': me.phone,
            }, true);

            this.waitForText("Submitted!", bot.recordEntryConfirmed);
        });
    }
});
