'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;


bot.run({
    name: 'ziploc',
    end: 'December 31, 2015 10:59:59 pm CST',
    startUrl: 'https://holiday.ziploc.com/',
    fn: function ziploc() {
        this.waitForSelector('#emailFormLogin', function () {
            this.fill('#emailFormLogin', {Identifier: me.email}, true);
        });
        //this.waitFor(function () {
        //    return this.evaluate(function () {
        //        /*globals window*/
        //        return window.onEndedEvent;
        //    });
        //});
        //this.then(function () {
        //    this.evaluate(function () {
        //        /*globals window*/
        //        window.onEndedEvent(); // videos won't play in casper, so we have to trigger the end manually
        //    });
        //});
        this.waitForSelector('#reveal_btn', function () {
            this.click('#reveal_btn');
        });
        this.waitForText('BUT YOU DID ENTER FOR A CHANCE TO WIN $10,000.', bot.recordEntryConfirmed);
    }
});
