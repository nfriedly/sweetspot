'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;

bot.run({
    name: 'HTC find your beat',
    end: 'January 3, 2016 11:59 pm EST',
    startUrl: 'https://htc.promo.eprize.com/FindYourBeat/',
    fn: function () {
        this.click('a.form-toggle.toggle-login');
        this.wait(1000, function() {
            this.fill('#intro_login_form', {
                "email": me.email2,
            }, true);
        });
        this.waitForText("Pick a pattern.", function() {
            bot.shortWait();
            this.fill('#survey_form_a', {
                q1: 'a2'
            }, false);
            this.click('a.btn_next');
            bot.shortWait();
            this.fill('#survey_form_a', {
                q2: 'a1'
            }, false);
            this.click('a.btn_next');
            bot.shortWait();
            this.fill('#survey_form_a', {
                q3: 'a2'
            }, false);
            this.click('a.btn_next');
            bot.shortWait();
            this.fill('#survey_form_a', {
                q5: 'a3'
            }, false);
            this.click('a.btn_next');
            bot.shortWait();
            this.fill('#survey_form_a', {
                q4: 'a1'
            }, false);
            this.click('input.btn_submit');
        });
        this.waitForText('You\'ve earned a sweepstakes entry!', bot.recordEntryConfirmed);
    }
});
