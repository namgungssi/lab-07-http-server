'use strict';


const http = require ('http');
const url = require ('url');
const cowsay = require ('cowsay');
const querystring = require('querystring');
const parseBody = require ('/parseBody.js');



let sendResponse = function (res, status, body) {
  res.writeHead (status, {'Content-Type' : 'text/html'});
  res.write (body);
  res.end ();
};


const server = module.exports = http.createServer ((req, res) {
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);


  if (req.method === 'GET' && req.url.pathname === '/') {
    sendResponse(res, 200, cowsay.say({text: 'hello', f: 'brian'}));
  } else if (req.method === 'GET' && req.url.pathname === '/cowsay') {

    let params = req.url.query;

    if(!params.text) {
      res.statusCode = 400;
      res.write(cowsay.say({text: 'hello', f: 'world'}));
      res.end();

    } else {

      sendResponse(res, 200, cowsay.say({text: params.text}));
    }
  } else if (req.method === 'POST' && req.url.pathname === './cowsay') {

    let body = '';
    req.on('data', function(data) {
      body += data.toString();
    });

    req.on('end', function() {
      let json;
      try {
        json = JSON.parse(body);
      } catch(e) {

        return sendResponse(res, 400, 'error json');
      }
      console.log(json);

      sendResponse(res, 200, ('json works'));
    });
  } else {
    sendResponse(res, 400, 'error request');
  }
});
