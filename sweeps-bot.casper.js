#!/usr/bin/env casperjs

"use strict";

var today = new Date();
var delay;
var returnCode = 0;
var errCount = 0;

function handleTimeout() {
    /*jshint validthis:true */
    this.debugHTML();
    this.echo("Timeout reached on " + this.getCurrentUrl());
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
        this.echo("Error: " + errorMessage +  " on " + this.getCurrentUrl());
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
            {url: 'http://www.behindthesigngiveaway.com/', end: 'October 31, 2015 10:59:59 pm mst'},
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

var skipScreenshot = false,
function addSweeps(name, end, startUrl, enter) {
    if (only &&  only != name) {
        return;
    }
    if (today < new Date(end)) {
        casper.then(function () {
            this.echo('beginning ' + name + ' - ' + startUrl);
        });
        casper.thenOpen(startUrl, function(){
skipScreenshot = false;
});
        shortWait();
        casper.then(enter);
        casper.then(function() {
if(!skipScreenshot){
            var filename = name.replace(/[^a-z0-9]+/ig, ' ').trim().replace(/\s+/g, '-') + '.png';
            this.capture('./screenshots/' + filename);
            this.echo('done with ' + name);
            this.echo('<' + filename + '>');
}
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

        casper.waitForText("Thank you for your submission", function(){skipScreenshot = true;});
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

        casper.waitForText("Thank you for your submission", function(){skipScreenshot = true;});
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
    casper.waitForText('Thanks for entering', function(){skipScreenshot = true;});
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
        casper.waitForResource('https://www.nbc.com/spt/nsweeps/nis_success_d.png', function(){skipScreenshot = true;});
    });
});

addSweeps('ziploc', 'December 31, 2015 10:59:59 pm CST', 'https://holiday.ziploc.com/', function ziploc() {
this.waitForSelector('#emailFormLogin', function() {
    this.fill('#emailFormLogin', {Identifier: email}, true);
});
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
    this.waitForSelector('#reveal_btn', function() {
        this.click('#reveal_btn');
    });
    this.wait(3000, function() {
       // this.debugHTML(); //todo: figure out success identifier
    });

});

addSweeps('sky viper', 'October 18, 2015 11:59 AM PST', 'http://www.fbpagetab.com/Skyrocket/SkyViper/Enter.html', function() {
    this.waitForSelector('form', function() {
        this.fill('form', {
            q1_firstName: first,
            q3_email3: email,
            q4_zipCode: zip,
        }, true);
    });
    this.wait(3000, function() {
       // this.debugHTML(); //todo: figure out success identifier
    });
});


// requires pre-registration (with captca)
addSweeps('twix', 'December 31, 2015 11:59:59 am EST', 'https://www.vote4twix.mars.com/', function() {
    this.evaluate(function() {
        /*globals $*/
        $('#PL_AgeGate_Birthdate_month').val('8').trigger('change');
        $('#PL_AgeGate_Birthdate_day').val('1').trigger('change');
        $('#PL_AgeGate_Birthdate_year').val('1986').trigger('change');
        $('input[type="submit"]').click();
    });
    this.wait(500);
    this.then(function() {
        this.fill('#emailFormLogin', {
            Identifier: 'nathan.friedly+twix@gmail.com'
        }, true);
    });
    shortWait();
    this.waitUntilVisible('label[for="btnCHOCO"]', function() {
        this.click('label[for="btnCHOCO"]');
    });
    this.waitForText('Thanks for voting!', function(){skipScreenshot = true;});
});

// boss: JSON.stringify(jQuery('form').serializeArray().reduce(function(res, cur){res[cur.name] = null; return res;}, {}), null, 2)
addSweeps('pepsi trailer', 'October 31, 2015 11:59 PM EST', 'https://unlockthetrailer.com/', function Pepsi() {
this.waitForSelector('#form1', function(){
    this.fill('#form1', {
        "txtEmail": email,
        "txtFirstName": first,
        "txtLastName": last,
        "ddlMonths": '8',
        "ddlDay": '1',
        "ddlYear": '1986',
        "txtAddress1": addr,
        "txtCity": city,
        "ddlState": 'Ohio',
        "txtZip": zip,
        "txtPhone": '9374091337',
    });
    this.click('#chkTermsAndConditions');
    this.click('#btnSubmit');
});
    this.waitForText('Thank You!', function(){skipScreenshot = true;});
});

////todo: add http://sweetiessweeps.com/2015/09/hgtv-com-fresh-faces-of-designawards-sweepstakes.html now that I'm registered
//addSweeps('hgtv', 'October 30, 2015 5:00 pm EST', 'http://www.hgtv.com/design/fresh-faces-of-design/sweepstakes', function() {
//
//});

addSweeps('reese', 'October 29, 2015 2:00 pm EST', 'http://www.reesespecialtyfoods.com/promotions', function() {
    this.waitUntilVisible('.group-wof-sweeps-content', function() {
        this.clickLabel('Enter Now', 'a');
    });
    this.waitUntilVisible('#wof-group1', function() {
        this.fill('#reese-world-of-flavor-sweeps-entityform-edit-form', {
            "field_wofs_email[und][0][email]": email,
            "field_wofs_first_name[und][0][value]": first,
            "field_wofs_last_name[und][0][value]": last,
        }, false);
        this.click('#form-control-next');
    });
    this.waitUntilVisible('#wof-group2', function() {
        this.fill('#reese-world-of-flavor-sweeps-entityform-edit-form', {

            "field_wofs_address[und][0][thoroughfare]": addr,
            "field_wofs_address[und][0][locality]": city,
            "field_wofs_address[und][0][administrative_area]": state,
            "field_wofs_address[und][0][postal_code]": zip,
        }, false);
        this.click('#form-control-next');
    });
    this.waitUntilVisible('#wof-group3', function() {
        this.fill('#reese-world-of-flavor-sweeps-entityform-edit-form', {
            "field_wofs_address[und][0][thoroughfare]": addr,
            "field_wofs_telephone[und][0][value]": phone,
        }, false);
        this.click('#form-control-next');
    });
    this.waitUntilVisible('#edit-field-wofs-age-check-und', function() {
        this.click('#edit-field-wofs-age-check-und');
        this.click('#edit-field-wofs-official-rules-und');
        this.click('#edit-field-wofs-privacy-policy-und');
        this.click('#edit-submit');
    });
    this.wait(3000, function() {
     //   this.debugHTML();
        // todo: figure out success text
    });
});


addSweeps('bobvila', 'October 31, 2015 11:59 am EST', 'http://www.bobvila.com/contest/kitchen-appliance-give-away', function(){
    this.waitForSelector('#new_contest_registration', function() {
        this.click('#contest_registration_newsletter');
        this.click('#contest_registration_partner');
        this.fill('#new_contest_registration', {
            "contest_registration[first_name]": first,
            "contest_registration[email]": email,
            "contest_registration[prize_choice]": 66,
            "contest_registration[newsletter]": false,
            "contest_registration[partner]": false,
        }, true);
        this.waitForText('Thank You for Entering', function(){skipScreenshot = true;});
    });
});

addSweeps('ford mud makeover', 'October 31, 2015 11:59 PM EST', 'https://www.fordmudmode.com/Index.aspx', function() {
    this.fill('#aspnetForm', {
        'ctl00$ContentPlaceHolder1$txtEmail': email
    }, false);
    this.click('#ctl00_ContentPlaceHolder1_btnEnterSweepstakes');
    this.then(function(){
        this.fill('#aspnetForm', {
            "ctl00$ContentPlaceHolder1$txtFirstName": first,
            "ctl00$ContentPlaceHolder1$txtLastName": last,
            "ctl00$ContentPlaceHolder1$txtAddress1": addr,
            "ctl00$ContentPlaceHolder1$txtCity": city,
            "ctl00$ContentPlaceHolder1$lstState": state,
            "ctl00$ContentPlaceHolder1$txtZipCode": zip,
            "ctl00$ContentPlaceHolder1$txtPhone": phone,
            "ctl00$ContentPlaceHolder1$txtEmail": email,
            "ctl00$ContentPlaceHolder1$txtConfirmEmail": email,
            "ctl00$ContentPlaceHolder1$MaleFemale": "rbMale",
            "ctl00$ContentPlaceHolder1$lstPrimaryVehicleMake": 'HON',
            "ctl00$ContentPlaceHolder1$lstWhenPurchaseVehicle": 'No Definite Plans'
        }, false);
        this.click('#ctl00_ContentPlaceHolder1_cbMinAge');
        this.click('#ctl00_ContentPlaceHolder1_cbAgreeTermsOfUseAndFordPolicy');
        this.click('#ctl00_ContentPlaceHolder1_imgbtnEnterSweepstakes');
    });
    this.waitForText('THANK YOU', function(){skipScreenshot = true;});
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
    this.wait(3000, function() {
        //this.debugHTML(); //todo: figure out success identifier
    });
});

//JSON.stringify(jQuery('form').serializeArray().reduce(function(res, cur){res[cur.name] = null; return res;}, {}), null, 2)
//this.wait(3000, function() {
//    this.debugHTML(); //todo: figure out success identifier
//})

casper.run(function() {
    this.exit(returnCode);
});
