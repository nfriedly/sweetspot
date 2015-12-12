'use strict';
var bot = require('../sweeps-bot.casper.js');
var today = new Date();

bot.run({
    name: 'facebook and reminders',
    end: '1/1/2020',
    startUrl: 'https://m.facebook.com/Newegg',
    noScreenshot: true,
    fn: function() {
        this.then(function () {

            this.echo('checking https://m.facebook.com/Newegg for new sweepstakes...');
            var text = this.fetchText('body');
            // facebook uses the · (bullet) character right before posts and then again in the like/share line right after the post.. so it's a nice way to single out a post (unless the post has that character... then the regex probably won't hit at all)
            //todo: catch it if multiple contests are announced on the same day
            var match = text.match(/· ([^·]*\b(giveaway|giving away|win|sweepstakes)\b[^·]+)[\d,]+ · Share/i);
            if (match) {
                this.echo(match[1]);
            }


        });
    }
});
