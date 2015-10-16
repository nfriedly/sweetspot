#!/usr/bin/env casperjs

"use strict";

var today = new Date();
var delay;
var returnCode = 0;
var errCount = 0;

function handleTimeout() {
    /*jshint validthis:true */
    this.debugHTML();
    this.echo("Timeout reached");
    errCount++;
    var name = 'timeout-' + errCount + '.png';
    this.capture('./screenshots/' + name);
    this.echo('<' + name + '>');
    returnCode = 1;
}

var casper = require('casper').create({
    //verbose: true,
    //logLevel: 'debug'
    onError: function(casperInstance, errorMessage /*, engine*/) {
        this.echo("Error: " + errorMessage);
        errCount++;
        var name = 'error-' + errCount + '.png';
        this.capture('./screenshots/' + name);
        this.echo('<' + name + '>');
        returnCode = 1;
    },
    onStepTimeout: handleTimeout,
    onTimeout: handleTimeout,
    onWaitTimeout: handleTimeout
});

casper.options.waitTimeout = 15*1000;

var slow = casper.cli.get("slow");
var only = casper.cli.get("only");

casper.start();
casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:40.0) Gecko/20100101 Firefox/40.0');


if (!only) {
    casper.then(function() {
        this.echo('captcha\'d sweepstakes:');
        [
            {url: 'http://littlehuglunchboxsurprise.com/enter_online/', end: 'October 30, 2015 10:00 AM EST'},
            {url: 'http://www.crazyexsweepstakes.com/', end: 'October 19, 2015 10:59:59 pm cst'},
            {url: 'https://holiday.ziploc.com/', end: 'December 31, 2015 10:59:59 pm cst'},
            {url: 'https://doubleshotpromo.com/', end: 'October 30, 2015  11:59:59 pm EST'}
        ].forEach(function(s){
            if (today < new Date(s.end)) {
                this.echo(s.url);
            }
        }, this);

        this.echo('checking https://m.facebook.com/Newegg for new sweepstakes...');
    });
    casper.thenOpen('https://m.facebook.com/Newegg', function() {
        var text = this.fetchText('body');
        // facebook uses the · (bullet) character right before posts and then again in the like/share line right after the post.. so it's a nice way to single out a post (unless the post has that character... then the regex probably won't hit at all)
        //todo: catch it if multiple contests are announced on the same day
        var match = text.match(/· ([^·]*\b(giveaway|giving away|win|sweepstakes)\b[^·]+)[\d,]+ · Share/i);
        if (match) {
            this.echo(match[1]);
            this.capture('./screenshots/facebook.png');
        }
    });
}

// for sweeps like newegg's that require a minimum of 24 hours between entries
// may cause a missed entry on the 1st of each month...
if (slow && !only) {
    delay = (new Date().getDate())*2 + Math.random();
    casper.then(function() {
        this.echo('waiting ' + delay + ' minutes');
    });
    casper.wait((delay*60)*1000);
}

function shortWait() {
    if (slow) {
        casper.wait((3+Math.random()*30) * 1000); // wait 3-33 seconds
    }
}

function addSweeps(name, end, startUrl, enter) {
    if (only &&  only != name) {
        return;
    }
    if (today < new Date(end)) {
        casper.then(function () {
            this.echo('beginning ' + name + ' - ' + startUrl);
        });
        casper.thenOpen(startUrl);
        shortWait();
        casper.then(enter);
        casper.then(function() {
            var filename = name.replace(/[^a-z0-9]+/ig, ' ').trim().replace(/\s+/g, '-') + '.png';
            this.capture('./screenshots/' + filename);
            this.echo('done with ' + name);
            this.echo('<' + filename + '>');
        });
    } else {
        casper.then(function () {
            this.echo(name + ' is now over');
        });
    }
}


var first = 'Nathan',
    last = 'Friedly',
    addr = '7527 Cox Rd.',
    city = 'Pleasant Hill',
    state = 'OH',
    zip = '45359',
    phone = '937-409-1337',
    email = 'nathan.friedly@gmail.com';

addSweeps('game like a pro sweepstakes', 'October 19, 2015 11:59 PM PST', 'http://promotions.newegg.com/nepro/15-4467/index.html?cm_mmc=SNC-twitter-_-sweeps-gamelikeapro-_-NA-_-NA&hootPostID=c49f68517f9091193f9c824d975962f9', function() {
    casper.withFrame(0, function() {
        //this.capture('./screen.png');
        //this.debugHTML();
        this.fill('#form_form', {
            'form[email]': email,
            'form[first_name]': first,
            'form[last_name]': last,
            'form[address_1]': addr,
            'form[city]': city,
            'form[province]': state,
            'form[postal_code]': zip,
            'form[phone]': phone,
            'form[age]': '29'
        }, true);

        casper.waitForText("Thank you for your submission");
    });
});

addSweeps('gamecrate lucky 13 corsair giveaway', 'November 13, 2015 11:59 PM PST', 'http://www.gamecrate.com/lucky-13-corsair-giveaway/11352?cm_mmc=SNC-Facebook-_-NA-_-GameCrate-lucky13corsair-_-NA', function() {
    casper.withFrame(0, function() {
        //this.capture('./screen.png');
        //this.debugHTML();
        this.fill('#form_form', {
            'form[email]': email,
            'form[first_name]': first,
            'form[last_name]': last,
            'form[address_1]': addr,
            'form[city]': city,
            'form[province]': state,
            'form[postal_code]': zip,
            'form[phone]': phone,
            'form[age]': '29'
        }, true);

        casper.waitForText("Thank you for your submission");
    });
});

addSweeps('hotwheels honda hr-v', '10/27/15 10:00 am PST', 'https://hotwheels.venturaassociates.net/', function() {
    this.fillSelectors('#sweepsform', {
        '#bmonth': '8',
        '#bday': '1',
        '#byear': '1986'
    }, true);
    shortWait();
    casper.waitForSelector('#entry_form', function() {
        this.fillSelectors('#entry_form', {
            '#first': first,
            '#last': last,
            '#add1': addr,
            '#city': city,
            '#usstate': state,
            '#zip': zip,
            '#email': email,
            '#email_confirm': email,
            '#rulesread': true,
            '#optin_hotwheels': false,
            '#optin_honda': false
        }, true);
    });
    casper.waitForText('Thanks for entering');
});

addSweeps('nissan voice', '11/4/2015 10:00 am PST', 'http://www.nbc.com/the-voice/nissan', function() {
    casper.withFrame(0, function() {
        this.click('label.rules-check');
        this.fill('#sweepstakes_pom', {
            'first-name': first,
            'last-name': last,
            'email': email,
            'phone': phone,
            'month': '08',
            'day': '01',
            'year': '1986',
            'zip-code': zip,
            //'rules-check': true
        }, true);
        casper.waitForResource('https://www.nbc.com/spt/nsweeps/nis_success_d.png');
    });
});

addSweeps('toshiba fantastic four', '1/31/2016 11:59 PM PST', 'https://www.toshibafantastic4sweeps.com/#/home/splash', function() {
    casper.waitForSelector('form[name="splashForm"]', function() {
        this.fill('form[name="splashForm"]', {
            email: email,
            zipcode: zip,
            birthDate: '08/08/1986'
        }, true);
        this.evaluate(function() {
            /*globals jQuery*/
            jQuery('#emailInput, #zipcodeInput, #birthDateInput').trigger('change');
        });
    });
    casper.wait(100);
    casper.then(function() {
        this.click('button.btn-primary');
    });
    casper.waitUntilVisible('form[name="registerForm"]', function() {
        this.click('div.checkbox label');
        this.fill('form[name="registerForm"]', {
            firstName: first,
            lastName: last,
            address1: addr,
            phone: phone
        }, false);
        this.evaluate(function() {
            /*globals jQuery*/
            jQuery('#firstNameInput, #lastNameInput, #address1Input, #phoneInput').trigger('change');
        });
    });
    casper.wait(100);
    casper.then(function() {
        this.click('button.btn-primary');
    });
    casper.wait(3000);
    // todo: figure out what text/emement to wait for
});

addSweeps('ziploc', 'December 31, 2015 10:59:59 pm CST', 'https://holiday.ziploc.com/', function() {
    this.fill('#emailFormLogin', {Identifier: email}, true);
    this.waitFor(function() {
        return this.evaluate(function() {
            /*globals window*/
            return window.onEndedEvent;
        });
    });
    this.then(function() {
        this.evaluate(function() {
            /*globals window*/
            window.onEndedEvent(); // videos won't play in casper, so we have to trigger the end manually
        });
    });
    this.waitForUrl('Register');
    //this.waitUntilVisible('h2.omnesMed.fs20.redCC');
});

addSweeps('sky viper', 'October 18, 2015 11:59 AM PST', 'https://www.fbpagetab.com/Skyrocket/SkyViper/Enter.html', function() {
    this.fill('form', {
        q1_firstName: first,
        q3_email3: email,
        q4_zipCode: zip,
    }, true);
});


//todo: add https://www.vote4twix.mars.com/

casper.run(function() {
    this.exit(returnCode);
});
