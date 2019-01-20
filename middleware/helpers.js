const config = require('../config'),
    qs = require('querystring');

function isInt(value) {
    var validator = /^[0-9]+$/;
    return validator.test(value);
}

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

exports.validate = function(req, callback) {
    let params = {};

    req.query = qs.parse(req._parsedUrl.query);

    if(req.query){
        if (!isBlank(req.query.count) && isInt(req.query.count)) {
            params['count'] = parseInt(req.query.count);
        }

        if (!isBlank(req.query.offset) && isInt(req.query.offset)) {
            params['offset'] = parseInt(req.query.offset);
        }
    }


    params['count'] = params['count'] || config.paginationStep;
    params['offset'] = params['offset'] || 0;

    return params;
};
