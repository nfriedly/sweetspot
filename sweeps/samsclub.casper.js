'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;

bot.run({
    name: 'Food Network Sams Club Party Like a Pro',
    end: '12/31/2015 10:00 AM EST',
    startUrl: 'http://www.foodnetwork.com/sponsored/packages/party-planning-like-a-pro/party-planning-like-a-pro-sweepstakes.html',
    fn: function () {
        var casper = this;
        var numFrames = 0;
        var frame = 0;
        function tryNext() {
            var found = false;
            casper.withFrame(frame, function () {
                this.echo('inspecting frame ' + frame);
                found = this.exists('#xReturningUserForm');
                if (found) {
                    this.echo('form found');
                    this.fillSelectors('#xReturningUserForm', {
                        '#xReturningUserEmail': me.email2
                    }, false);
                    this.click('#xCheckUser span');
                    bot.shortWait();
                    this.waitForText('Thanks', bot.recordEntryConfirmed); // todo: confirm this text
                }
            });
            // we can't call tryNext from within the withFrame block because it would try to use a sub-frame of the frame
            casper.then(function() {
                if (!found) {
                    frame++;
                    if (frame < numFrames) {
                        tryNext();
                    }
                }
            })
        }
        this.waitForSelector('#ngxFrame37991', function () {
            numFrames = this.evaluate(function () {
                    /*globals frames */
                    return frames.length;
                }) || 2;
            tryNext();
        });
    }
});
