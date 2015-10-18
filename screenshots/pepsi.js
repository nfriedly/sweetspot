'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;


bot.run({
    name: 'pepsi trailer',
    end: 'October 31, 2015 11:59 PM EST',
    startUrl: 'https://unlockthetrailer.com/',
    fn: function () {
        this.waitForSelector('#form1', function () {
            this.fill('#form1', {
                "txtEmail": me.email,
                "txtFirstName": me.first,
                "txtLastName": me.last,
                "ddlMonths": '8',
                "ddlDay": '1',
                "ddlYear": '1986',
                "txtAddress1": me.addr,
                "txtCity": me.city,
                "ddlState": 'Ohio',
                "txtZip": me.zip,
                "txtPhone": '9374091337',
            });
            this.click('#chkTermsAndConditions');
            this.click('#btnSubmit');
        });
        this.waitForText('Thank You!', bot.recordEntryConfirmed);
    }
});
