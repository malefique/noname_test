const config = require('./config');
const morgan = require('morgan');
const http = require('http');
const Router = require('router');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const router = new Router();
const logger = morgan('combined');

mongoose.connect(config.mongodb.url, (err) => {
    if (err) throw err;
});

const server = http.createServer((req, res) => {

    const error404 = function(){
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('API method not found\n');
    };

    logger(req,res, function(err){

        if(err) return error404();

        router.use(bodyparser.json());
        router.use(bodyparser.urlencoded({ extended: true }));
        router.use('/api', routes.api(router));

        router(req,res, function(err){
            console.log(err);
            if(err)
            error404();
        });
    });

});

server.listen(config.appPort, () => {
    console.log('Server listening port ' + config.appPort);
});

process.on('SIGTERM', () => {
    server.close(() => {
        mongoose.connection.close(false, () => {
            process.exit(0);
        });
    });
});

