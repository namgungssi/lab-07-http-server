'use strict';


const fs = require ('fs');
const expect = require ('expect');
const cowsay = require ('cowsay');
const request = require ('superagent');
const server = require ('./_server');
const host = 'localhost:' + PORT;


describe ()
