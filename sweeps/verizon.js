'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;

bot.run({
    name: 'Verizon Moto 360',
    end: 'November 8, 2015 11:59 PM EST',
    startUrl: 'http://www.verizonwireless.com/mobile-living/inside/Moto4Me/',
    fn: function () {
        this.clickLabel('Enter to win', 'a');
        this.waitForSelector('#gform_92', function() {
            this.fill('#gform_92', {
                "input_1.3": me.first,
                "input_1.6": me.last,
                "input_2": '8/1/1986',
                "input_3": me.phone,
                "input_4.1": me.addr,
                "input_4.3": me.city,
                "input_4.4": me.state,
                "input_4.5": me.zip,
                "input_5": me.email2
            }, false);
            this.evaluate(function () {
                /*globals jQuery*/
                jQuery('input[name="input_2"]').trigger('change');
            });
            this.click('#gform_submit_button_92');
        });
        this.waitForText('Thank you for entering!', bot.recordEntryConfirmed);
    }
});
