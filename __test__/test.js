'use strict';

const expect = require('expect');
const request = require('superagent');
const cowsay = require('cowsay');

const server = require('../_server');

const PORT = 5555;
const host = 'localhost:' + PORT;

describe('our first http server', function() {
  before(function(done) {
    server.listen(PORT, done);
  });

  after(function(done) {
    server.close(done);
  });

  it('should respond to a get request', function(done) {
    request
      .get(host + '/')
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.text).toBe(cowsay.say({text: 'Hi!', f: 'Ghostbusters'}));
        done();
      });
  });


  it('should process query params', function(done) {
    request
      .get(host + '/cowsay?text=test')
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.text).toBe(cowsay.say({text: 'test'}));
        done();
      });
  });

  it('should process json', function(done) {
    request
      .post(host + '/cowsay')
      .send({text: 'hello test'})
      .end((err, res) => {
        expect(err).toBe(null);

        expect(res.text).toBe('got the json');
        done();
      });
  });

  it('should error on bad JSON', function(done) {
    request
      .post(host + '/cowsay')
      .send('{"bad":"json')
      .end((err, res) => {
        expect(err).not.toBe(null);
        expect(err.message).toBe('Bad Request');
        expect(res.text).toBe('bad json!');
        done();
      });
  });

  it('should give a 400 on a bad url', function(done) {
    request
      .get(host + '/doesnotexist')
      .end((err, res) => {
        expect(err).not.toBe(null);
        expect(err.message).toBe('Bad Request');
        expect(res.text).toBe('bad request');

        done();
      });
  });
});
