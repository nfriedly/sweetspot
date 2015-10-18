'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;


bot.run({
    name: 'sky viper',
    end: 'October 18, 2015 11:59 AM PST',
    startUrl: 'http://www.fbpagetab.com/Skyrocket/SkyViper/Enter.html',
    fn: function () {
        this.waitForSelector('form', function () {
            this.fill('form', {
                q1_firstName: me.first,
                q3_email3: me.email,
                q4_zipCode: me.zip,
            }, true);
        });
        this.wait(5000, function () {
            // this.debugHTML(); //todo: figure out success identifier
        });
    }
});
