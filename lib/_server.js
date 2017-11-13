'use strict';


const http = require ('http');
const url = require ('url');
const cowsay = require ('cowsay');
const fs = require ('fs');
const urlParser = require ('./url-parser.js');
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
  res.writeHead (status, {'Content-Type' : text / plain});
  res.write (body);
  res.end ();
};


const server = module.exports = http.createServer ((req, res) {
  urlParser.execute (req);


  if (req.method === 'GET' && req.url.pathname === '/') {
    try {
      read ('./lib/data/cowsay.html')
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


  else if (req.method === 'GET' && req.url.pathname === './cowsay') {
    try {

      if (Object.getPropertyNames (req.url.query).length === 0 {
        sendResponse ('text / html', res, 200, cowsay.say ({{text : 'hello world'}}))
      })
      else {
        sendResponse ('text / html', res, 200, cowsay.say ({text : '${req.url.query.text'}}))
      }

      catch (err) {
        console.log ('error', err);
        sendResponse ('text / html', res, 400, cowsay.say ({text : 'invalid request'}))
        throw err;
      }
    }
  }


  else if (req.method === 'POST' && req.url.pathname === '/api/cowsay') {
    parseBody.execute (req)
    .then ((req) => {
      res.writeHead (200, {'Content-Type' : text / json'});
      res.statusMessage = 'OK';
      res.write (cowsay.say ({text : '{'content' : ${JSON.stringify (req.body.text)}}}));
      res.end ();
      return;
    })

    .catch ((err) => {
      console.log ('Error POST : ${err}');
      res.writeHead (400, {'Content-Type' : 'text / json'});
      res.write (cowsay.say ({text : '{'error' : "invalid request : query text required"}}'));
      res.end ();
      return :
    });


  } else {
    sendResponse ('text / html', res, 404, 'error');
  }
});



module.exports = {
  start : (port, callback) => server.listen (port, callback),
  stop : (callback) => server.close (callback)
};
