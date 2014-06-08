'use strict';

module.exports = function () {

    return function (req, res, next) {
        req.multi = req.multi || {};

        next();
    };
};
