'use strict';

var path = require('path');

function normalizeUrl(protocol, baseURL, resource) {
    // ensure that we have somekind of string that is not `undefined`
    resource = '/' + (resource || '');

    // using path.resolve to prevent funny business like '/api/../foo'

    return protocol + '://' + baseURL + path.resolve(resource);
}

module.exports = normalizeUrl;
