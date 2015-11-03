'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;

bot.run({
    name: 'SC Johnson Happy Thanksgathering ',
    end: 'November 25, 2015 10:59 pm CST',
    startUrl: 'https://www.happythanksgathering.com/',
    fn: function () {
        this.clickLabel('HELP GET ME HOME', 'a');
        bot.shortWait();
        this.waitUntilVisible('form', function() {
            this.fill('form', {
                Email: me.email2
            }, true);
        });
        bot.shortWait();
        this.withFrame(0, function() {
            this.waitUntilVisible('label[for="agree-false"]', function() {
                this.click('label[for="agree-false"]');
                this.click('#btn-submit');
            });
            this.waitForText('Try Again Tomorrow', bot.recordEntryConfirmed, function() {
                this.echo('Possible visit win!');
                bot.screenshot('thanksgathering-visit-win.png');
                this.debugHTML();
            });
        });
        bot.shortWait();
        this.thenOpen('https://www.happythanksgathering.com/');
        bot.shortWait(function() {
            this.clickLabel('HELP ME HOST', 'a');
        });
        bot.shortWait();
        this.waitUntilVisible('form', function() {
            this.fill('form', {
                Email: me.email2
            }, true);
        });
        bot.shortWait();
        this.withFrame(0, function() {
            this.waitForText('Try Again Tomorrow', bot.recordEntryConfirmed, function() {
                this.echo('Possible host win!');
                bot.screenshot('thanksgathering-host-win.png');
                this.debugHTML();
            });
        });

    }
});
