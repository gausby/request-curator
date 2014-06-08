/*global describe it after before*/
'use strict';

var assert = require('assert');
var server = require('./assets/server');
var curator = require('../lib/request-curator');
var request = require('superagent');

describe('Request curator', function() {
    var app = server();

    app.get('/multi', curator(), function(req, res) {
        res.json('{"foo": "bar"}');
    });

    app.listen(3000);

    it('should be able to setup a endpoint', function(done) {
        request.get('localhost:3000/multi').end(function(err, res) {
            assert.equal(res.statusCode, 200);
            done();
        });
    });

    it('should set a `multi` key on the request object', function(done){
        app.get('/raw', curator(), function(req, res) {
            assert.equal(typeof req.multi, 'object');
            res.send('ok');
        });

        request.get('localhost:3000/raw').end(function() { done(); });
    });
});
