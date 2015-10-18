'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;

bot.run({
    name: 'toshiba fantastic four',
    end: '1/31/2016 11:59 PM PST',
    startUrl: 'https://www.toshibafantastic4sweeps.com/#/home/splash',
    fn: function () {
        this.waitForSelector('form[name="splashForm"]', function () {
            this.fill('form[name="splashForm"]', {
                email: me.email,
                zipcode: me.zip,
                birthDate: '08/08/1986'
            }, true);
            this.evaluate(function () {
                /*globals jQuery*/
                jQuery('#emailInput, #zipcodeInput, #birthDateInput').trigger('change');
            });
        });
        this.wait(100);
        this.then(function () {
            this.click('button.btn-primary');
        });

// this part is first-time only
        /*
         this.waitUntilVisible('form[name="registerForm"]', function() {
         this.click('div.checkbox label');
         this.fill('form[name="registerForm"]', {
         firstName: me.first,
         lastName: me.last,
         address1: me.addr,
         phone: phone
         }, false);
         this.evaluate(function() {
         /*globals jQuery
         jQuery('#firstNameInput, #lastNameInput, #address1Input, #phoneInput').trigger('change');
         });
         });
         this.wait(100);
         this.then(function() {
         this.click('button.btn-primary');
         });
         */

        this.waitForText('You are not an instant winner', bot.recordEntryConfirmed);
    }
});
