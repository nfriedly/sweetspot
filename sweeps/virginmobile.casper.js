'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;

bot.run({
    name: 'Virgin Mobile Gigaway',
    end: '12/31/2015 11:59 PM EST',
    startUrl: 'http://www.doitforthedata.com/gigaway',
    fn: function () {

        this.fill('#enter-form form', {
            'name': me.name,
            phone: me.phone,
            email: me.email2,
            email_confirmation: me.email2
        }, false);
        this.click('#age-field');
        this.click('input[name="submit_btn"]');
        this.waitForText('Thanks', bot.recordEntryConfirmed);
    }
});
