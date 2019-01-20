const Router = require('router'),
      middleware = require('../middleware'),
      controllers = require('../controllers');

module.exports = function(router) {

    router.get('/', function(req,res){
        const params = middleware.helpers.validate(req);
        controllers.languages.get(params, function(err, data){
            res.statusCode = (err ? 400 : 200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({errors: err, data: data}));
        });
    });

    router.get('/top5', function(req,res){
        controllers.languages.get({ count: 5, offset: 0}, function(err, data){
            res.statusCode = (err ? 400 : 200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({errors: err, data: data}));
        });
    });

    router.post('/', function(req,res){
        controllers.languages.add(req.body, function(err, data){
            res.statusCode = (err ? 400 : 200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({errors: err, data: data}));
        });
    });

    router.put('/:_id/', function(req,res){
        controllers.languages.edit(req.params._id, req.body, function(err, data){
            res.statusCode = (err ? 400 : 200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({errors: err, data: data}));
        });
    });

    router.delete('/:_id', function(req,res){
        controllers.languages.delete(req.params._id, function(err, data){
            res.statusCode = (err ? 400 : 200);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({errors: err, data: data}));
        });
    });

    return router;
};