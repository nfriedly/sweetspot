'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;

bot.run({
    name: 'Gordons wicked simple sweepstakes',
    end: 'December 10, 2015 1:59:59 pm EST',
    startUrl: 'https://gortonswickedsimple.pgtb.me/BDBDF9',
    fn: function () {
        this.fill('#form_form', {
            'form[first_name]': me.first,
            'form[last_name]': me.last,
            'form[email]': me.email2,
            'form[custom_field_1]': 'cook it for me :)',
            'form[agree]': true
        }, true);
        this.waitForText('Thanks for entering!', bot.recordEntryConfirmed);
    }
});
