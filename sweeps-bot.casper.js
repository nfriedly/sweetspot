"use strict";
/* globals require:true, patchRequire:false*/
var require = patchRequire(require);

var today = new Date();
var delay;
var returnCode = 0;
var errCount = 0;
var casper;
var slow;
var curSweeps = '';

function screenshot(name) {
    casper.capture('./screenshots/' + name);
    casper.echo('{' + name + '}');
}

function handleTimeout() {
    /*jshint validthis:true */
    //this.debugHTML();
    this.echo("Timeout reached on " + this.getCurrentUrl());
    errCount++;
    var name = curSweeps + '-timeout-' + errCount + '.png';
    screenshot(name);
    returnCode = 1;
}


// for sweeps like newegg's that require a minimum of 24 hours between entries
// may cause a missed entry on the 1st of each month...
function min24() {
    if (slow) {
        delay = (new Date().getDate()) * 2 + Math.random();
        casper.then(function () {
            this.echo('waiting ' + delay + ' minutes');
        });
        casper.wait((delay * 60) * 1000);
    }
}


function shortWait() {
    if (slow) {
        casper.wait((3 + Math.random() * 30) * 1000); // wait 3-33 seconds
    }
}

var entryConfirmed = false;
function recordEntryConfirmed() {
    entryConfirmed = true;
}

function run(i) {
    casper = require('casper').create({
        //verbose: true,
        //logLevel: 'debug'
        onError: function (casperInstance, errorMessage /*, engine*/) {
            this.echo("Error: " + errorMessage + " on " + this.getCurrentUrl());
            errCount++;
            var name = curSweeps + '-error-' + errCount + '.png';
            screenshot(name);
            returnCode = 1;
        },
        onStepTimeout: handleTimeout,
        onTimeout: handleTimeout,
        onWaitTimeout: handleTimeout
    });

    casper.options.waitTimeout = 15 * 1000;

    slow = casper.cli.get("slow");

    casper.start();
    casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:40.0) Gecko/20100101 Firefox/40.0');

    var name  = i.name, end = i.end, startUrl = i.startUrl, enter = i.fn;
    curSweeps = name.replace(/[^a-z0-9]+/ig, ' ').trim().replace(/\s+/g, '-');

    if (today < new Date(end)) {
        casper.then(function () {
            this.echo('beginning ' + name + ' - ' + startUrl);
        });
        casper.thenOpen(startUrl, function () {
            entryConfirmed = false;
        });
        shortWait();
        casper.then(enter);
        casper.then(function () {
            if (entryConfirmed) {
                this.echo('entry confirmed!');
            } else {
                var filename = curSweeps + '.png';
                this.echo('done with ' + name);
                screenshot(filename);
            }
        });
    } else {
        casper.then(function () {
            this.echo(name + ' is now over');
        });
    }
    casper.run(function () {
        this.exit(returnCode);
    });
}
exports.min24 = min24;
exports.shortWait = shortWait;
exports.recordEntryConfirmed = recordEntryConfirmed;
exports.run = run;
exports.screenshot = screenshot;

exports.me = {
    first: 'Nathan',
    last: 'Friedly',
    addr: '7527 Cox Rd.',
    city: 'Pleasant Hill',
    state: 'OH',
    zip: '45359',
    phone: '937-409-1337',
    email: 'nathan.friedly@gmail.com'
};




//JSON.stringify(jQuery('form').serializeArray().reduce(function(res, cur){res[cur.name] = null; return res;}, {}), null, 2)
//this.wait(3000, function() {
//    this.debugHTML(); //todo: figure out success identifier
//})


