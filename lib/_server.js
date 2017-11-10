'use strict';


const http = require ('http');
const url = require ('url');
const cowsay = require ('cowsay');
const fs = require ('fs');
const parseRequest = require ('./parseRequest.js');
const parseBody = require ('/parseBody.js');


let read = (filename) => {
  return new Promise (function (resolve, reject) {
    fs.readFile (filename, (err, data) => {
      if (err)
      reject (err);
      resolve (data);
    });
  });
};


let sendResponse = function (type, res, status, body) {
  res.writeHead (status, {'Content-Type' : 'text / plain'});
  res.write (body);
  res.end ();
};


const server = module.exports = http.createServer ((req, res) {
  parseRequest.execute (req);


  if (req.method === 'GET' && req.url.pathname === '/') {
    try {
      read ('./lib/data/cowsay')
      .then ((data) => {
        sendResponse ('text/html', res, 200, cowsay.say ({ text : `${data}`}));
      })
      .catch ((err) => {
        console.log ('error is ${err}');
      });

    } catch (err) {
      console.log ('error', err);
      sendResponse ('text / plain', res, 400, cowsay.say ({text : 'invalid request'});))
    }
  }
