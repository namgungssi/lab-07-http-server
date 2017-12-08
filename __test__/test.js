'use strict';


const fs = require ('fs');
const expect = require ('expect');
const cowsay = require ('cowsay');
const request = require ('superagent');
const server = require ('./_server.js');
const host = 'localhost:' + PORT;


describe ('http server', function () {
  before ((done) => {
    server.start (process.env.PORT, () => {
      console.log ('server up at ', process.env.PORT);
      done ();
    });
  });

  after ((done) => {
    server.stop (() => done ());
  });

  it ('should respond to a GET request', function(done) {
    let html = fs.readFileSync ('./lib/data/cowsay.html');
    request
    .get (host + '/')
    .end ((err, res) => {
      expect (err).toBe (null);
      expect (res.status).toEqual (200);
      expect (res.text).toBe ('http request');
      done ();
    });
  });

  it ('should execute param', function(done) {
    request
    .get (host + '/cowsay?text=error')
    .end ((err, res) => {
      expect (err).toBe (null);
      expect (res.status).toEqual (200);
      expect (res.text).to.have.string ('mooo');
      done ();
    });
  });

  it ('should handle 404 on a bad url', function(done) {
    request
    .get (host + '/error')
    .end ((err, res) => {
      expect (err).not.be.null;
      expect (res.status).toEqual (404);
      expect (res.text).toBe.string ('error cannot find');
      done ();
    });
  }
};
});
