// note: run this file via `npm start` which automatically ensures that the casperjs and phantomjs dependencies are in $PATH
'use strict';

var fs = require('fs');
var uncolor = require('uncolor');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var cp = require('child_process');
var path = require('path');
require('dotenv').config({silent: true});
var argv = require('yargs').argv;
var async = require('async');
var concat = require('concat-stream');
var prefixStream = require('prefix-stream');


var mailer = nodemailer.createTransport(sgTransport({
    auth: {
        api_user: process.env.SENDGRID_USERNAME,
        api_key: process.env.SENDGRID_PASSWORD
    }
}));


console.log(require('./package.json').name + ' starting on ' + new Date().toUTCString());

if (process.env.SOURCE) {
    console.log("Source: " + process.env.SOURCE);
}

var allResults = [];
var allSuccess = true;

var scripts = fs.readdirSync('./sweeps/').filter(function (name) {
    return path.extname(name) == '.js';
});

if (argv.only) {
    scripts = scripts.filter(function(name) {
        return (name.indexOf(argv.only) != -1);
    });
}

async.eachLimit(scripts, 5, function (script, next) {
    console.log('running %s...', script);

    var proc, args;

    if (script.substr(-10) === '.casper.js') {

        args = [
            '--ignore-ssl-errors=yes',
            'sweeps/' + script
        ];
        if (process.env.SOURCE != 'localdev') {
            args.push('--slow');
        }

        proc = cp.spawn('casperjs', args);
    } else {
        args = [

        ];
        if (process.env.SOURCE != 'localdev') {
            args.push('--slow');
        }
        var opts = {
            silent: true // don't automatically pipe stdio, we want to handle it manually
            // execArgv: ['--harmony']
        };

        proc = cp.fork('./sweeps/' + script, args, opts);
    }

    var prefix = path.basename(script, '.js') + ': ';
    proc.stdout.pipe(prefixStream(prefix)).pipe(process.stdout);
    proc.stderr.pipe(prefixStream(prefix)).pipe(process.stderr);

    proc.stdout.pipe(concat(function(stdout) {
        var logs = stdout.toString()
            .replace(/Unsafe JavaScript attempt to access frame with URL about:blank .*[\r\n]{1,2}/g, '');
        allResults.push(logs);

        //todo: read screenshots here in case there happen to be conflicting names
    }));

    var watchdog = setTimeout(function() {
        console.log('Assuming %s is hung, killing', script);
        proc.kill();
    }, 60*60*1000);

    proc.on('close', function(code) {
        clearTimeout(watchdog);
        allSuccess = allSuccess && (code === 0);
        next();
    });


}, function() {

    if (!process.env.EMAIL) {
        process.exit(allSuccess ? 0 : 1);
    }

    console.log('Emailing results to %s', process.env.EMAIL);


    var contents = allResults.join('\n');

    contents = uncolor(contents);

    var email = {
        to: process.env.EMAIL,
        from: process.env.EMAIL,
        subject: '[sweeps-bot] ' + (allSuccess ?  'Success' : 'Error') ,
        text: contents,
        html: contents.replace(/\n/g, '<br>'),
        attachments: []
    };

    fs.readdir('./screenshots/', function(err, files) {

        function getRandomId() {
            return parseInt(Math.random().toString().slice(2), 10).toString(36);
        }

        var lastImage = new Buffer(0);
        files.filter(function (name) {
            return path.extname(name) == '.png';
        }).forEach(function (name) {
            var content = fs.readFileSync('./screenshots/' + name);
            var replaceTarget = '{' + name + '}';
            if (content.compare(lastImage, content) === 0) {
                console.log('skipping duplicate image');
                email.html = email.html.replace(replaceTarget, '');
            } else {
                lastImage = content;
                var cid = getRandomId() + '@screen.png';
                email.attachments.push({
                    filename: name,
                    content: content, // read the file into memory so that we can delete it right away
                    cid: cid
                });
                // try to put the images inline with their sweeps
                var replaceValue = '<img src="cid:' + cid + '"/>';
                if(email.html.indexOf(replaceTarget) != -1) {
                    email.html = email.html.replace(replaceTarget, replaceValue);
                } else {
                    // append the image to the end if we can't find the sweeps it goes with
                    email.html += '<br>' + replaceValue;
                }
            }
            if (!argv.keepimages) {
                fs.unlinkSync('./screenshots/' + name); // delete the file so we don't accidentally send the same screenshot twice
            }
        });


        mailer.sendMail(email, function(err, res) {
            if (err) {
                console.error(err);
            }
            console.log(res);
            process.exit(allSuccess ? 0 : 1);
        });
    });

});

