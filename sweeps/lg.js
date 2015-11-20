var _ = require('lodash');
var twit = require('../twitter.js');

function post(msg) {
    return new Promise(function(resolve, reject) {
        twit.post('statuses/update', { status: msg }, function(err, data, response) {
            if (err) {
                return reject(err);
            }
            resolve('https://twitter.com/' + data.user.screen_name + '/status/' + data.id);
        });
    });
}

var today = new Date();

if (today < new Date('December 21, 2015 11:59 PM EST')) {
    console.log('running LG oled tweet');
    var lgtweets = [
        '@LGUS is giving away a beautiful TV https://twitter.com/LGUS/status/660856361786339328  #OLEDisHere #sweepstakes',
        'OLED has lower overall energy usage #OLEDisHere #sweepstakes',
        'OLED has and perfectly black blacks (without sacraficing brightness) #OLEDisHere #sweepstakes',
        'I want to win! #OLEDisHere #sweepstakes',
        'Pick me @LGUS! #OLEDisHere #sweepstakes',
        'Win a 55" 1080p OLED TV from @LGUS - https://twitter.com/LGUS/status/660856361786339328 - #OLEDisHere #sweepstakes',
        'Win a 55" 1080p OLED TV from @LGUS - https://twitter.com/LGUS/status/660856361786339328 - #OLEDisHere #sweepstakes',
        'Win a 55" 1080p OLED TV from @LGUS - https://twitter.com/LGUS/status/660856361786339328 - #OLEDisHere #sweepstakes',
        'Win a 55" 1080p OLED TV from @LGUS - https://twitter.com/LGUS/status/660856361786339328 - #OLEDisHere #sweepstakes',
        'Win a 55" 1080p OLED TV from @LGUS - https://twitter.com/LGUS/status/660856361786339328 - #OLEDisHere #sweepstakes',
        'Win a 55" 1080p OLED TV from @LGUS - https://twitter.com/LGUS/status/660856361786339328 - #OLEDisHere #sweepstakes',
        'Win a 55" 1080p OLED TV from @LGUS - https://twitter.com/LGUS/status/660856361786339328 - #OLEDisHere #sweepstakes',
        'Win a 55" 1080p OLED TV from @LGUS - https://twitter.com/LGUS/status/660856361786339328 - #OLEDisHere #sweepstakes',
        'Win a 55" 1080p OLED TV from @LGUS - https://twitter.com/LGUS/status/660856361786339328 - #OLEDisHere #sweepstakes',
        'Win a 55" 1080p OLED TV from @LGUS - https://twitter.com/LGUS/status/660856361786339328 - #OLEDisHere #sweepstakes',
        'Win a 55" 1080p OLED TV from @LGUS - https://twitter.com/LGUS/status/660856361786339328 - #OLEDisHere #sweepstakes',
    ];
    var tweet = _.sample(lgtweets);
    post(tweet)
        .then(console.log.bind(console, 'tweeted: '))
        .catch(function(err) {
            console.log('errored: ', err);
            process.exit(0);
        });
} else {
    console.log('lg oled contest is over');
}
