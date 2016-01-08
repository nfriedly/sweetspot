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

            this.echo('checking Newegg\'s facebook for new sweepstakes...');
            var text = this.fetchText('body');

            // pro tip: RegEx#exec always returns exactly one match, but it remembers it's index when performing a global match and starts from there the next time
            // so, you can put it in a while loop and it will return each match once
            var match, re=/giveaway|giving away|win|sweepstakes|3d/ig;
            while(match = re.exec(text)) {
                var length = 500, halflen = Math.round(length/2);
                var start = Math.max(0, match.index-halflen);
                var snippet = text.substr(start, length);
                // trim it up to try and only include a single post or at least start and end on a whole word
                var firstdot = snippet.substr(0, halflen).lastIndexOf('·'), lastdot = snippet.substr(halflen).indexOf('·');
                start = (halflen > firstdot > 0) ? firstdot : snippet.indexOf(' ');
                var end = (lastdot !=-1 ) ? lastdot+halflen : snippet.lastIndexOf(' ');
                // todo : trim "19 hrs" or whatever from end when appropriate
                this.echo((start?'...':'') + snippet.substring(start, end) + '...');
            }
        });
    }
});
