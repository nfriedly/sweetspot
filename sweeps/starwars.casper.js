//http://promos.rtm.com/StarWars/
'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;

bot.run({
    name: 'Childres Place Star Wars',
    end: '12/7/2015 11:59:59 PM EST',
    startUrl: 'http://promos.rtm.com/StarWars/',
    fn: function () {
        this.fill('#ageGateFormSection', {
            'dobMonth': '8',
            'dobDay': '1',
            'dobYear': '1986'
        }, false);
        this.click('#ageGateSubmit');
        bot.shortWait();
        this.waitForSelector('#emailLoginForm', function() {
            this.fill('#emailLoginForm', {
                country: 'USA',
                splashEmail: me.email2
            }, false);
            this.click('#splashEmailBtn');
        });
        bot.shortWait();
        this.waitForText('Skip game, take me to my result!', function() {
            this.clickLabel('Skip game, take me to my result!', 'a');
        });
        this.waitForText('Better luck next time!', bot.recordEntryConfirmed);
    }
});
