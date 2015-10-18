'use strict';
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;

bot.run({
    name: 'ford mud makeover',
    end: 'October 31, 2015 11:59 PM EST',
    startUrl: 'https://www.fordmudmode.com/Index.aspx',
    fn: function () {
        this.fill('#aspnetForm', {
            'ctl00$ContentPlaceHolder1$txtEmail': me.email
        }, false);
        this.click('#ctl00_ContentPlaceHolder1_btnEnterSweepstakes');
        // first time only
        //this.then(function () {
        //    this.fill('#aspnetForm', {
        //        "ctl00$ContentPlaceHolder1$txtFirstName": me.first,
        //        "ctl00$ContentPlaceHolder1$txtLastName": me.last,
        //        "ctl00$ContentPlaceHolder1$txtAddress1": me.addr,
        //        "ctl00$ContentPlaceHolder1$txtCity": me.city,
        //        "ctl00$ContentPlaceHolder1$lstState": me.state,
        //        "ctl00$ContentPlaceHolder1$txtZipCode": me.zip,
        //        "ctl00$ContentPlaceHolder1$txtPhone": me.phone,
        //        "ctl00$ContentPlaceHolder1$txtEmail": me.email,
        //        "ctl00$ContentPlaceHolder1$txtConfirmEmail": me.email,
        //        "ctl00$ContentPlaceHolder1$MaleFemale": "rbMale",
        //        "ctl00$ContentPlaceHolder1$lstPrimaryVehicleMake": 'HON',
        //        "ctl00$ContentPlaceHolder1$lstWhenPurchaseVehicle": 'No Definite Plans'
        //    }, false);
        //    this.click('#ctl00_ContentPlaceHolder1_cbMinAge');
        //    this.click('#ctl00_ContentPlaceHolder1_cbAgreeTermsOfUseAndFordPolicy');
        //    this.click('#ctl00_ContentPlaceHolder1_imgbtnEnterSweepstakes');
        //});
        //this.waitForText('THANK YOU', function () {
        //    entryConfirmed = true;
        //});
        // after first time
        this.waitForResource('https://www.fordmudmode.com/img/thankyou-sweeps.jpg', bot.recordEntryConfirmed);
    }
});
