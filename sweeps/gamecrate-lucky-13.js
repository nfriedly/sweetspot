'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;

bot.run({
    name: 'gamecrate lucky 13 corsair giveaway',
    end: 'November 13, 2015 11:59 PM PST',
    startUrl: 'http://www.gamecrate.com/lucky-13-corsair-giveaway/11352?cm_mmc=SNC-Facebook-_-NA-_-GameCrate-lucky13corsair-_-NA',
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
