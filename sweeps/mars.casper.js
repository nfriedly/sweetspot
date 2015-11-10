'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;

bot.run({
    name: 'Mars get charged for the holidays',
    end: '12/31/2015 11:59 am EST',
    startUrl: 'https://getcharged.mars.com/',
    noScreenshot: true,
    fn: function () {
        this.echo('skipping for now...');
        /*
        this.fillSelectors('form', {
            '#PL_AgeGate_Birthdate_month': '8',
            '#PL_AgeGate_Birthdate_day': '1',
            '#PL_AgeGate_Birthdate_year': '1986'
        }, true);
        bot.shortWait();
        this.waitForSelector('#emailFormLogin', function() {
            this.fill('#emailFormLogin', {
                Identifier: me.email2
            }, false);
            this.click('input.btn-enter');
        });
        var casper = this;
        function clickNext() {
            if (casper.exists('div.gameTop_X')) {
                casper.click('div.gameTop_X');
                var delay = 500 + Math.random() * 1000;
                casper.wait(delay, clickNext);
            } else {
                casper.waitForText('SORRY', bot.recordEntryConfirmed);
            }

        }
        bot.shortWait();
        this.waitForSelector('div.gameTop_X', clickNext);
        */
    }
});
