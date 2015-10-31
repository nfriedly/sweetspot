//

'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;

bot.run({
    name: 'Family Dollar gift card',
    end: '12/24/15 11:59:59 pm CST',
    startUrl: 'https://profile.scjbrands.com/glade-familydollar-2015/default.aspx',
    fn: function () {
        this.fill('#Form1', {
            "FirstNameTextBox": me.first,
            "LastNameTextBox": me.last,
            "Address1TextBox": me.addr,
            "CityTextBox": me.city,
            "StateDropDownList": 'OH',
            "ZipTextBox": me.zip,
            "Phone2TextBox": '937',
            "Phone3TextBox": '409',
            "Phone4TextBox": '1337',
            "EmailTextBox": me.email,
            "ConfirmEmailTextbox": me.email,
            "BirthdayMonthDropDownList": "08",
            "BirthdayDayDropDownList": "01",
            "BirthdayYearDropDownList": "1986",
            "AgreeCheckBox": true
        }, false);
        this.click('#SubmitButton');
        this.waitForText('Sorry, you are not an Instant Winner this time.', bot.recordEntryConfirmed);
    }
});
