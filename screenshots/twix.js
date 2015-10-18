'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;


// requires pre-registration (with captca)
bot.run({
    name: 'twix',
    end: 'December 31, 2015 11:59:59 am EST',
    startUrl: 'https://www.vote4twix.mars.com/',
    fn: function () {
        this.evaluate(function () {
            /*globals $*/
            $('#PL_AgeGate_Birthdate_month').val('8').trigger('change');
            $('#PL_AgeGate_Birthdate_day').val('1').trigger('change');
            $('#PL_AgeGate_Birthdate_year').val('1986').trigger('change');
            $('input[type="submit"]').click();
        });
        this.wait(500);
        this.then(function () {
            this.fill('#emailFormLogin', {
                Identifier: 'nathan.friedly+twix@gmail.com'
            }, true);
        });
        bot.shortWait();
        this.waitUntilVisible('label[for="btnCHOCO"]', function () {
            this.click('label[for="btnCHOCO"]');
        });
        this.waitForText('Thanks for voting!', bot.recordEntryConfirmed);
    }
});
