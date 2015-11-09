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
            // these don't really belong here but meh...
            this.echo('captcha\'d sweepstakes:');
            [
                {url: 'http://www.diynetwork.com/shows/income-property/sweepstakes/dont-hate-renovate', end: 'November 21, 2015 5:00 pm EST'},
                {url: 'http://www.hgtv.com/shows/income-property/sweepstakes/dont-hate-renovate', end: 'November 21, 2015 5:00 pm EST'},
            ].forEach(function (s) {
                    if (today < new Date(s.end)) {
                        this.echo(s.url);
                    }
                }, this);

            this.echo('checking https://m.facebook.com/Newegg for new sweepstakes...');
            var text = this.fetchText('body');
            // facebook uses the · (bullet) character right before posts and then again in the like/share line right after the post.. so it's a nice way to single out a post (unless the post has that character... then the regex probably won't hit at all)
            //todo: catch it if multiple contests are announced on the same day
            var match = text.match(/· ([^·]*\b(giveaway|giving away|win|sweepstakes)\b[^·]+)[\d,]+ · Share/i);
            if (match) {
                this.echo(match[1]);
            }


            this.echo('checking https://m.facebook.com/DellUniversity for new trivia...');
            this.thenOpen('https://m.facebook.com/DellUniversity', function() {
                var text = this.fetchText('body');
                var match = text.match(/· ([^·]*\b(TriviaTuesday|giveaway|giving away|win|sweepstakes)\b[^·]+)[\d,]+ · Share/i);
                if (match) {
                    this.echo(match[1]);
                }
            });

        });
    }
});
