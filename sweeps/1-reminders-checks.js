'use strict';
var bot = require('../sweeps-bot.casper.js');
var today = new Date();

bot.run({
    name: 'facebook and reminders',
    end: '1/1/2020',
    startUrl: 'https://m.facebook.com/Newegg',
    fn: function() {
        this.then(function () {
            // these don't really belong here but meh...
            this.echo('captcha\'d sweepstakes:');
            [
                {url: 'http://littlehuglunchboxsurprise.com/enter_online/', end: 'October 30, 2015 10:00 AM EST'},
                {url: 'http://www.behindthesigngiveaway.com/', end: 'October 31, 2015 10:59:59 pm mst'},
                {url: 'https://www.healthychildren.org/english/pages/sweeps.aspx/', end: 'October 31, 2015 11:59 pm EST'},
                {url: 'https://doubleshotpromo.com/', end: 'October 30, 2015  11:59:59 pm EST'},
                {url: 'http://www.hgtv.com/design/fresh-faces-of-design/sweepstakes', end: 'October 30, 2015 5:00 pm EST'},
                {url: 'http://www.shopyourway.com/app/2/l/', end: 'November 26, 2015 11:59:59 PM CST'},
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
            bot.recordEntryConfirmed(); // skip the screenshot
        });
    }
});
