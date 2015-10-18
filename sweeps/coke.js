#!/usr/bin/env casperjs
"use strict";
/* globals require:true, patchRequire:false*/
var require = patchRequire(require);
var bot = require('../sweeps-bot.casper.js');
var me = bot.me;

bot.run({
    name: 'coke freestyle',
    end: 'November 30, 2015 11:59 pm EST',
    startUrl: 'https://cocacola.promo.eprize.com/freestylemix15/',
    fn: function () {
        this.clickLabel('Already Registered? ', 'a'); // this step doesn't fail... but also doesn't seem to work properly
        this.fillSelectors('#intro_login_form', {
            "#email": me.email,
        }, false);
        this.waitForText('Sweepstakes entered!', bot.recordEntryConfirmed);
    }
});
