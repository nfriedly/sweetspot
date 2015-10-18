'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;


bot.run({
    name: 'reese',
    end: 'October 29, 2015 2:00 pm EST',
    startUrl: 'http://www.reesespecialtyfoods.com/promotions',
    fn: function () {
        this.waitUntilVisible('.group-wof-sweeps-content', function () {
            this.clickLabel('Enter Now', 'a');
        });
        this.waitUntilVisible('#wof-group1', function () {
            this.fill('#reese-world-of-flavor-sweeps-entityform-edit-form', {
                "field_wofs_email[und][0][email]": me.email,
                "field_wofs_first_name[und][0][value]": me.first,
                "field_wofs_last_name[und][0][value]": me.last,
            }, false);
            this.click('#form-control-next');
        });
        this.waitUntilVisible('#wof-group2', function () {
            this.fill('#reese-world-of-flavor-sweeps-entityform-edit-form', {

                "field_wofs_address[und][0][thoroughfare]": me.addr,
                "field_wofs_address[und][0][locality]": me.city,
                "field_wofs_address[und][0][administrative_area]": me.state,
                "field_wofs_address[und][0][postal_code]": me.zip,
            }, false);
            this.click('#form-control-next');
        });
        this.waitUntilVisible('#wof-group3', function () {
            this.fill('#reese-world-of-flavor-sweeps-entityform-edit-form', {
                "field_wofs_address[und][0][thoroughfare]": me.addr,
                "field_wofs_telephone[und][0][value]": me.phone,
            }, false);
            this.click('#form-control-next');
        });
        this.waitUntilVisible('#edit-field-wofs-age-check-und', function () {
            this.click('#edit-field-wofs-age-check-und');
            this.click('#edit-field-wofs-official-rules-und');
            this.click('#edit-field-wofs-privacy-policy-und');
            this.click('#edit-submit');
        });
        this.waitForText('Thank you for entering!', bot.recordEntryConfirmed);
    }
});
