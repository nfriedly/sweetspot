//<a href="thanks" class="skip">SKIP</a>
'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;

bot.run({
    name: 'UrbanDaddy Tour de Distillery',
    end: 'November 8, 2015 11:59 pm EST',
    startUrl: 'http://www.urbandaddy.com/tx/tourdedistillery/',
    fn: function () {
        this.fillSelectors('form', {
            '#email': me.email2,
            '#zipcode': me.zip,
        }, true);
        this.waitForSelector('a.skip', function(){
            this.click('a.skip');
        });
        this.waitForText('THANKS', bot.recordEntryConfirmed);
    }
});
