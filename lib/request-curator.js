'use strict';
var superagent = require('superagent');
var each = require('operandi').eachParallel;
var normalizeUrl = require('./normalize-url');

module.exports = function () {
    return function (req, res, next) {
        // The result will be stored in this key
        req.multi = req.multi || {};

        // Make all the requested queries into absolute urls
        var query = {};
        Object.keys(req.query).forEach(function(item) {
            query[item] = normalizeUrl(req.protocol, req.headers.host, req.query[item]);
        });


        var postFetch = function (err) {
            if (res.statusCode === 404) {
                // Filter out failed requests and get error messages
                var errors = Object.keys(req.multi).map(function(item) {
                    if (req.multi[item].statusCode === 404) {
                        return req.multi[item].text;
                    }
                }).filter(Boolean);

                req.multi = { err: errors };
                return next(err);
            }

            Object.keys(req.multi).forEach(function(resource) {
                var current = req.multi[resource];
                req.multi[resource] = current.body;
            });

            next(err);
        };


        // Get the result of every url in the query
        each(query, function(query, key, done) {
            var request = superagent.agent();
            var uri = query[key];

            request.get(uri).set(req.headers).end(function(err, response) {
                if (response.statusCode === 404) {
                    // flag the session as a dud
                    res.statusCode = 404;
                }

                req.multi[key] = response;
                done(err);
            });
        }, postFetch);
    };
};
