#!/usr/bin/env casperjs

"use strict";

var today = new Date();

function handleTimeout() {
    /*jshint validthis:true */
    this.capture('./timeout.png');
    this.echo("Timeout reached, screenshot saved");
}

var casper = require('casper').create({
    //verbose: true,
    //logLevel: 'debug'
    onError: function(casperInstance, errorMessage /*, engine*/) {
        this.echo("Error: " + errorMessage);
        this.echo("capturing screenshot");
        this.capture('./error.png');
    },
    onStepTimeout: handleTimeout,
    onTimeout: handleTimeout,
    onWaitTimeout: handleTimeout
});

casper.options.waitTimeout = 15*1000;

casper.start();
casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:40.0) Gecko/20100101 Firefox/40.0');

if (today < new Date('October 19, 2015 11:59 PM PST')) {
    casper.then(function () {
        this.echo('beginning game like a pro sweepstakes');
    });
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
        this.capture('./gamelikeapro.png');
        this.echo("Done with game like a pro sweepstakes!");
    });
} else {
    casper.then(function () {
        this.echo('skipping game like a pro sweepstakes');
    });
}

var username = casper.cli.get("username");
var password = casper.cli.get("password");

if (username && password) {
    casper.then(function() {
        this.echo('checking for new sweepstakes...');
    });
// lastly, check for any new sweepstakes
    casper.thenOpen('http://www.fbrell.com/');
    casper.waitForText('Executed example', function() {
        // create a regular js function and call toString on it
        this.echo('initiating FB login');
        this.click('#rell-login');
    });
//casper.waitForPopup('https://www.facebook.com/login.php?skip_api_login=1&api_key=184484190795');
    casper.wait(3000);
    casper.withPopup('facebook.com', function () {
        this.fill('#login_form', {
            email: username,
            pass: password
        }, true);
    });
    casper.then(function() {
        this.echo('logging in...');
    });
    casper.waitForText('auth.login event');
    casper.then(function(){
        this.evaluate(function() {
            /*global FB, Log, document */
            FB.api('/Newegg/feed', function(response) {
                var contests = response.data
                    .filter(function(d){
                        return d.from.name == 'Newegg';
                    })
                    .map(function(d){
                        return d.message;
                    })
                    .filter(function(m){return /giveaway|win|sweepstakes/i.test(m);});
                Log.info('sweepstakes', contests.join('\n') || 'No current sweepstakes');
            });
        });
    });
    casper.waitForText('sweepstakes', function() {
        var text = this.evaluate(function() {
            return document.querySelector('div.log-entry.log-info div.bd').textContent;
        });
        this.echo('Sweepstakes: \n' + text);
    });
}



casper.run();
