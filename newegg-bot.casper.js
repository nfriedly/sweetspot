#!/usr/bin/env casperjs

"use strict";

function handleTimeout() {
    /*jshint validthis:true */
    this.capture('./screen.png');
    this.echo("Timeout reached, screenshot saved");
}

var casper = require('casper').create({
    //verbose: true,
    //logLevel: 'debug'
    onError: function(casperInstance, errorMessage /*, engine*/) {
        this.echo("Error: " + errorMessage);
        this.echo("capturing screenshot");
        this.capture('./screen.png');
    },
    onStepTimeout: handleTimeout,
    onTimeout: handleTimeout,
    onWaitTimeout: handleTimeout
});

casper.options.waitTimeout = 15*1000;

casper.start();
casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:40.0) Gecko/20100101 Firefox/40.0');

casper.thenOpen('http://promotions.newegg.com/nepro/15-4467/index.html?cm_mmc=SNC-twitter-_-sweeps-gamelikeapro-_-NA-_-NA&hootPostID=c49f68517f9091193f9c824d975962f9', function login() {
    //this.capture('./screen.png');
    //this.debugHTML();
});
casper.wait(10*1000);
casper.withFrame(0, function() {
    //this.capture('./screen.png');
    //this.debugHTML();
    this.fill('#form_form', {
        'form[email]': 'nathan.friedly+newegg@gmail.com',
        'form[first_name]': 'Nathan',
        'form[last_name]': 'Friedly',
        'form[address_1]': '7527 Cox Rd',
        'form[city]': 'Pleasant Hill',
        'form[province]': 'OH',
        'form[postal_code]': '45359',
        'form[phone]': '937-409-1337',
        'form[age]': '29'
    }, true);
});
casper.waitForResource('http://a.pgtb.me/facebook/form/39738567');
casper.wait(1000);
casper.then(function() {
    this.capture('./screen.png');
    this.echo("Done!");
});

casper.run();
