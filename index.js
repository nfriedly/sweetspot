// note: run this file via `npm start` which automatically ensures that the casperjs and phantomjs dependencies are in $PATH
'use strict';

var fs = require('fs');
var uncolor = require('uncolor');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var cp = require('child_process');
require('dotenv').config({silent: true});


var mailer = nodemailer.createTransport(sgTransport({
    auth: {
        api_user: process.env.SENDGRID_USERNAME,
        api_key: process.env.SENDGRID_PASSWORD
    }
}));


if (new Date() < new Date('October 19, 2015 11:59 PM PST')) {

    console.log(require('./package.json').name + ' starting on ' + new Date().toUTCString());
    if (process.env.SOURCE) {
        console.log("Source: " + process.env.SOURCE);
    }
    console.log('Running CasperJS script...');

    var result = cp.spawnSync('casperjs', ['newett-bot.casper.js' ]);


    console.log(result.stdout.toString());
    console.error(result.stderr.toString());

    console.log('Emailing results to %s', process.env.EMAIL);


    var contents = [
        'stdout:', result.stdout.toString(),
        '',
        'stderr:', result.stderr.toString()
    ].join('\n');

    contents = uncolor(contents);

    var email = {
        to: process.env.EMAIL,
        from: process.env.EMAIL,
        subject: '[vzw-bot] ' + (result.status === 0 ?  'Success' : 'Error') ,
        text: contents,
        html: contents.replace(/\n/g, '<br>'),
    };

    if(fs.existsSync('./screen.png')) {
        var cid = Date.now() + '@screen.png';
        email.attachments = [{
            filename: 'screen.png',
            content: fs.readFileSync('./screen.png'), // read the file into memory so that we can delete it right away
            cid: cid
        }];
        email.html += '<br><br>Screenshot:<br><img src="cid:' + cid + '"/>';
        fs.unlinkSync('./screen.png'); // delete the file so we don't accidentally send the same screenshot twice
    }

    mailer.sendMail(email, function(err, res) {
        if (err) {
            console.error(err);
        }
        console.log(res);
        process.exit(result.status);
    });
} else {
     console.error('contest is over');

    mailer.sendMail({
        to: process.env.EMAIL,
        from: process.env.EMAIL,
        subject: '[newegg-bot] sweepstakes over!',
        text: 'the sweepstakes has ended, you should shut me down'
    }, function(err, res) {
        if (err) {
            console.error(err);
        }
        console.log(res);
        process.exit(1);
    });
}

