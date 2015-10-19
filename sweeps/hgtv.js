'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;

bot.run({
    name: 'hgtv',
    end: 'October 30, 2015 5:00 pm EST',
    startUrl: 'http://www.hgtv.com/design/fresh-faces-of-design/sweepstakes',
    fn: function () {
        this.withFrame('ngxFrame35721', function () {
            this.fillSelectors('#xReturningUserForm', {
                '#xReturningUserEmail': me.email
            }, true);
            this.waitForSelector('#xSecondaryForm', function step2() {
                this.evaluate(function() {
                    /*globals $*/
                    $('#xSecondaryForm button').removeAttr('disabled').click();
                });
            });
        });
        this.waitForText('Thanks for Entering!', bot.recordEntryConfirmed);
    }
});
