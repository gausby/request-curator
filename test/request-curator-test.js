/*global describe it after before*/
'use strict';

var assert = require('assert');
var server = require('./assets/server');
var curator = require('../lib/request-curator');
var superagent = require('superagent');

describe('Request curator', function() {
    var app = server();

    app.get('/multi', curator(), function(req, res) {
        res.json(req.multi);
    });

    app.listen(3000);

    it('should be able to setup an endpoint', function(done) {
        var agent = superagent.agent();
        agent.get('localhost:3000/multi').end(function(err, res) {
            assert.equal(res.statusCode, 200);
            // an empty object is returned if no parameters has been passed in
            assert.deepEqual(res.body, {});

            done();
        });
    });

    it('should set a `multi` key on the request object', function(done){
        var agent = superagent.agent();
        app.get('/raw', curator(), function(req, res) {
            res.json(req.multi);
        });

        agent.get('localhost:3000/raw?test=/api/countries').end(function(res) {
            assert.equal(typeof res, 'object');

            done();
        });
    });

    it('should be able to fetch a resource that exists', function(done) {
        var agent = superagent.agent();

        agent.get('localhost:3000/multi?country=/api/countries').end(function(res) {
            assert.deepEqual(
                res.body,
                { country: ['Denmark', 'Sweden', 'Norway'] }
            );

            done();
        });
    });

    it('should be able to fetch multiple resources that exists', function(done) {
        var agent = superagent.agent();

        agent.get('localhost:3000/multi?user=/api/customers/23&country=/api/countries').end(function(res) {
            assert.deepEqual(res.body, {
                user: {name: 'John Doe', age: 23},
                country: ['Denmark', 'Sweden', 'Norway']
            });

            done();
        });
    });

    it('should return 404 if one of the resources is nonexistent', function(done) {
        var agent = superagent.agent();

        agent.get('localhost:3000/multi?foo=/api/foo/&country=/api/bar').end(function(res) {
            assert.equal(res.statusCode, 404);
            assert.deepEqual(res.body, {
                err: [
                    'Cannot GET /api/foo\n',
                    'Cannot GET /api/bar\n'
                ]
            });

            done();
        });
    });

    it('should pass on its headers on to the following requests', function(done) {
        var agent = superagent.agent();

        // an endpoint that just return the passed in headers
        app.get('/return-header', function(req, res) {
            res.json(req.headers);
        });

        agent.get('localhost:3000/multi?headers=/return-header').set('foo', 'bar').end(function(res) {
            assert.equal(res.body.headers.foo, 'bar');

            done();
        });
    });
});
