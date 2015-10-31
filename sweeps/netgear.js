'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;

bot.run({
    name: 'netgear fantasy football',
    end: '11/12/15 11:59 pm PST',
    startUrl: 'http://www.netgear.com/landings/fantasyfootball2015.html',
    fn: function () {
        this.withFrame(0, function() {
            this.clickLabel('Confirm', 'button');
            this.click('div[data-question="1"][data-choice="4"] span.quiz_checkbox');
            this.click('div[data-question="2"][data-choice="3"] span.quiz_checkbox');
            this.click('div[data-question="3"][data-choice="4"] span.quiz_checkbox');
            this.click('div[data-question="4"][data-choice="1"] span.quiz_checkbox');
            this.click('div[data-question="5"][data-choice="4"] span.quiz_checkbox');
            this.fill('#input', {
                custom_2_first: me.first,
                custom_2_last: me.last,
                email: me.email2,
                custom_4: false
            }, true);
            this.waitForResource('https://s3-external-1.amazonaws.com/offertabs/offer/ty2pco/56141325f1158-ThankYou.jpg', bot.recordEntryConfirmed);
        });
    }
});
