const Joi = require('joi');
const winston =require('winston');

//this handle only in request processing pipieline erroes
module.exports = function (err, req,res,next) {
    winston.error(err.message,err);
    res.status(500).send(err.message);  
};

/*
const winstonFileLogger =winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [ new winston.transports.File ({
        filename: 'error.log',
      })]
})
const winstonConsoleLogger =winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [ new winston.transports.mon ()]
})
*/