#!/usr/bin/env casperjs

"use strict";

var today = new Date();
var returnCode = 0;

function handleTimeout() {
    /*jshint validthis:true */
    this.capture('./timeout.png');
    this.echo("Timeout reached, screenshot saved");
    returnCode = 1;
}

var casper = require('casper').create({
    //verbose: true,
    //logLevel: 'debug'
    onError: function(casperInstance, errorMessage /*, engine*/) {
        this.echo("Error: " + errorMessage);
        this.echo("capturing screenshot");
        this.capture('./error.png');
        returnCode = 1;
    },
    onStepTimeout: handleTimeout,
    onTimeout: handleTimeout,
    onWaitTimeout: handleTimeout
});

casper.options.waitTimeout = 15*1000;

var slow = casper.cli.get("slow");

casper.start();
casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:40.0) Gecko/20100101 Firefox/40.0');

casper.then(function() {
    this.echo('checking https://m.facebook.com/Newegg for new sweepstakes...');
});
casper.thenOpen('https://m.facebook.com/Newegg', function() {
    var text = this.fetchText('body');
    // facebook uses the · (bullet) character right before posts and then again in the like/share line right after the post.. so it's a nice way to single out a post (unless the post has that character... then the regex probably won't hit at all)
    //todo: catch it if multiple contests are announced on the same day
    var match = text.match(/· ([^·]*\b(giveaway|win|sweepstakes)\b[^·]+)[\d,]+ · Share/i);
    if (match) {
        this.echo(match[1]);
        this.capture('./facebook.png');
    }
});


if (today < new Date('October 19, 2015 11:59 PM PST')) {
    casper.then(function () {
        this.echo('beginning game like a pro sweepstakes');
    });
    casper.thenOpen('http://promotions.newegg.com/nepro/15-4467/index.html?cm_mmc=SNC-twitter-_-sweeps-gamelikeapro-_-NA-_-NA&hootPostID=c49f68517f9091193f9c824d975962f9', function login() {
        //this.capture('./screen.png');
        //this.debugHTML();
    });
    if (slow) {
        var delay = (new Date().getDate()-10)*2 + Math.random();
        casper.then(function() {
            this.echo('waiting ' + delay + ' minutes');
        });
        casper.wait((delay*60)*1000);
    }
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
    casper.waitForText("Thank you for yoyr submission", function() {
        this.capture('./gamelikeapro.png');
        this.echo("Done with game like a pro sweepstakes!");
    });
} else {
    casper.then(function () {
        this.echo('skipping game like a pro sweepstakes');
    });
}



casper.run(function() {
    this.exit(returnCode);
});
