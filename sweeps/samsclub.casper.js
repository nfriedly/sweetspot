'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;

bot.run({
    name: 'Food Network Sams Club Party Like a Pro',
    end: '12/31/2015 10:00 AM EST',
    startUrl: 'http://www.foodnetwork.com/sponsored/packages/party-planning-like-a-pro/party-planning-like-a-pro-sweepstakes.html',
    fn: function () {
        this.withFrame(1, function() {
            this.fillSelectors('#xReturningUserForm', {
                '#xReturningUserEmail': me.email2
            }, false);
            this.click('#xCheckUser span');
            bot.shortWait();
            this.waitForText('Thanks', bot.recordEntryConfirmed); // todo: confirm this text
        });
    }
});
