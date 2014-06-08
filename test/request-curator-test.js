/*global describe it after before*/
'use strict';

var assert = require('assert');
var server = require('./assets/server');
var curator = require('../lib/request-curator');

describe('Request curator', function() {
    var app = server();
    app.listen(3000);

    it('should state the obvious', function() {
        assert(true);
    });
});
