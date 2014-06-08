/*global describe it after before*/
'use strict';

var assert = require('assert');
var normalizeUrl = require('../lib/normalize-url');

describe('Request curator url normalizer', function() {
    it('should return the full path to the resource given a host and a relative resource', function() {
        assert.deepEqual(
            normalizeUrl('http', 'example.com', '/api/foo/'),
            'http://example.com/api/foo'
        );
    });

    it('should strip multiple slashes', function() {
        assert.deepEqual(
            normalizeUrl('http', 'example.com', '///api///foo//'),
            'http://example.com/api/foo'
        );
    });

    it('should work with relative resources', function() {
        assert.deepEqual(
            normalizeUrl('http', 'example.com', 'api/foo/'),
            'http://example.com/api/foo'
        );
    });
});
