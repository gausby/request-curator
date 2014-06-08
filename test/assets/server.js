'use strict';

var express = require('express');

module.exports = function() {
    var app = express();
    app.get('/', function(req, res){
        res.send('index');
    });

    app.get('/api/users', function(req, res){
        res.json({users: 'hello'});
    });

    app.get('/api/customers/23', function(req, res){
        res.json({name: 'John Doe', age: 23});
    });

    app.get('/api/countries', function(req, res) {
        res.json([
            'Denmark',
            'Sweden',
            'Norway'
        ]);
    });

    return app;
};
