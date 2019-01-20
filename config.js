let config = {};

//prod
let production = {};
production.appPort = 8080;
production.paginationStep = 20;

production.mongodb = {};
production.mongodb.url = 'mongodb://localhost:27017/noname';

//dev
let dev = {};
dev.appPort = 8081;
dev.paginationStep = 20;

dev.mongodb = {};
dev.mongodb.url = 'mongodb://localhost:27017/noname';

module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'production':
            return Object.assign(config, production);
        default:
            return Object.assign(config, dev);
    }
}();