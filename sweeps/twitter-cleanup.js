/**
 * Created by nfriedly on 11/20/15.
 */
var twit = require('../twitter.js');

console.log('cleaning up twitter...');
twit.get('statuses/user_timeline', {screen_name:'misticflame', count: 50}, function(err, data, response) {
    if (err) {
        console.log('error fetching tweets', err);
        return;
    }
    console.log('got %s recent tweets', data.length);
    var numdeleted = 0;
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    data.forEach(function(tweet) {
        if (
            tweet.text.match(/@SYWSweeps|@lgus/i) ||
            (tweet.text.match(/\b#?win\b|winner|giveaway|giving.*away|sweepstakes|@androidauth|@tabtimes|@realsoundguys/i) && new Date(tweet.created_at) < yesterday)
        ) {
            numdeleted++;
            twit.post('statuses/destroy/' + tweet.id_str, function(err) {
                if (err) {
                    console.log('error deleting tweet %s %s \n%s', tweet.id_str, tweet.text, err, JSON.stringify(tweet, null, 2));
                }
            });
        }
    });
    console.log('deleting %s tweets', numdeleted);
});
