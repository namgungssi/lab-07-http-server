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

  it('should GET request', function(done) {
    request
      .get(host + '/')
      .end((err, res) => {
        expect(err).toBe(null);
        expect(res.text).toBe(cowsay.say({text: 'hello', f: 'brian'}));
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
      .send({text: 'good keep going'})
      .end((err, res) => {
        expect(err).toBe(null);

        expect(res.text).toBe('json success');
        done();
      });
  });

  it('should note error bad JSON', function(done) {
    request
      .post(host + '/cowsay')
      .send('{"error":"json')
      .end((err, res) => {
        expect(err).not.toBe(null);
        expect(err.message).toBe('error request');
        expect(res.text).toBe('json error');
        done();
      });
  });

  it('should error 400 on bad url', function(done) {
    request
      .get(host + '/doesnotexist')
      .end((err, res) => {
        expect(err).not.toBe(null);
        expect(err.message).toBe('error request');
        expect(res.text).toBe('error request');

        done();
      });
  });
});
